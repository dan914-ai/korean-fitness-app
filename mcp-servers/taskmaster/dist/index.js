#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
class TaskMasterServer {
    server;
    tasks = new Map();
    constructor() {
        this.server = new Server({
            name: '@fitness-app/taskmaster-mcp-server',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
    }
    setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'task_create',
                    description: 'Create a new task',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            title: { type: 'string', description: 'Task title' },
                            description: { type: 'string', description: 'Task description' },
                            priority: {
                                type: 'string',
                                enum: ['low', 'medium', 'high'],
                                default: 'medium'
                            },
                            tags: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'Task tags'
                            },
                            dueDate: { type: 'string', description: 'Due date (ISO format)' },
                        },
                        required: ['title'],
                    },
                },
                {
                    name: 'task_list',
                    description: 'List all tasks or filter by status',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            status: {
                                type: 'string',
                                enum: ['todo', 'in-progress', 'done'],
                                description: 'Filter by status'
                            },
                            tag: { type: 'string', description: 'Filter by tag' },
                        },
                    },
                },
                {
                    name: 'task_update',
                    description: 'Update an existing task',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Task ID' },
                            title: { type: 'string', description: 'New title' },
                            description: { type: 'string', description: 'New description' },
                            status: {
                                type: 'string',
                                enum: ['todo', 'in-progress', 'done'],
                                description: 'New status'
                            },
                            priority: {
                                type: 'string',
                                enum: ['low', 'medium', 'high'],
                                description: 'New priority'
                            },
                            tags: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'New tags'
                            },
                            dueDate: { type: 'string', description: 'New due date' },
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'task_delete',
                    description: 'Delete a task',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Task ID to delete' },
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'task_clear',
                    description: 'Clear all completed tasks',
                    inputSchema: {
                        type: 'object',
                        properties: {},
                    },
                },
            ],
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            switch (request.params.name) {
                case 'task_create':
                    return this.createTask(request.params.arguments);
                case 'task_list':
                    return this.listTasks(request.params.arguments);
                case 'task_update':
                    return this.updateTask(request.params.arguments);
                case 'task_delete':
                    return this.deleteTask(request.params.arguments);
                case 'task_clear':
                    return this.clearCompleted();
                default:
                    throw new Error(`Unknown tool: ${request.params.name}`);
            }
        });
    }
    createTask(args) {
        const task = {
            id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: args.title,
            description: args.description,
            status: 'todo',
            priority: args.priority || 'medium',
            tags: args.tags || [],
            dueDate: args.dueDate,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.tasks.set(task.id, task);
        return {
            content: [
                {
                    type: 'text',
                    text: `Task created successfully!\nID: ${task.id}\nTitle: ${task.title}\nPriority: ${task.priority}`,
                },
            ],
        };
    }
    listTasks(args) {
        let tasks = Array.from(this.tasks.values());
        if (args.status) {
            tasks = tasks.filter(t => t.status === args.status);
        }
        if (args.tag) {
            tasks = tasks.filter(t => t.tags?.includes(args.tag));
        }
        tasks.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        if (tasks.length === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'No tasks found matching the criteria.',
                    },
                ],
            };
        }
        const taskList = tasks.map(t => `[${t.status}] ${t.title} (${t.priority})${t.dueDate ? ` - Due: ${new Date(t.dueDate).toLocaleDateString()}` : ''}\n  ID: ${t.id}${t.description ? `\n  ${t.description}` : ''}`).join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `Found ${tasks.length} task(s):\n\n${taskList}`,
                },
            ],
        };
    }
    updateTask(args) {
        const task = this.tasks.get(args.id);
        if (!task) {
            throw new Error(`Task not found: ${args.id}`);
        }
        if (args.title !== undefined)
            task.title = args.title;
        if (args.description !== undefined)
            task.description = args.description;
        if (args.status !== undefined)
            task.status = args.status;
        if (args.priority !== undefined)
            task.priority = args.priority;
        if (args.tags !== undefined)
            task.tags = args.tags;
        if (args.dueDate !== undefined)
            task.dueDate = args.dueDate;
        task.updatedAt = new Date().toISOString();
        this.tasks.set(args.id, task);
        return {
            content: [
                {
                    type: 'text',
                    text: `Task updated successfully: ${task.title}`,
                },
            ],
        };
    }
    deleteTask(args) {
        if (!this.tasks.has(args.id)) {
            throw new Error(`Task not found: ${args.id}`);
        }
        const task = this.tasks.get(args.id);
        this.tasks.delete(args.id);
        return {
            content: [
                {
                    type: 'text',
                    text: `Task deleted: ${task.title}`,
                },
            ],
        };
    }
    clearCompleted() {
        const completedTasks = Array.from(this.tasks.entries())
            .filter(([_, task]) => task.status === 'done');
        completedTasks.forEach(([id]) => this.tasks.delete(id));
        return {
            content: [
                {
                    type: 'text',
                    text: `Cleared ${completedTasks.length} completed task(s).`,
                },
            ],
        };
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('TaskMaster MCP server running...');
    }
}
const server = new TaskMasterServer();
server.run().catch(console.error);
