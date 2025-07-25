#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class Context7Server {
    server;
    contexts = new Map();
    storageFile;
    constructor() {
        this.storageFile = path.join(__dirname, '..', 'contexts.json');
        this.server = new Server({
            name: '@fitness-app/context7-mcp-server',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
        this.loadContexts();
    }
    async loadContexts() {
        try {
            const data = await fs.readFile(this.storageFile, 'utf-8');
            const contexts = JSON.parse(data);
            contexts.forEach(ctx => this.contexts.set(ctx.id, ctx));
        }
        catch (error) {
            // File doesn't exist yet, that's okay
        }
    }
    async saveContexts() {
        const contexts = Array.from(this.contexts.values());
        await fs.writeFile(this.storageFile, JSON.stringify(contexts, null, 2));
    }
    setupHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'context_save',
                    description: 'Save content as a named context',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', description: 'Context name' },
                            content: { type: 'string', description: 'Content to save' },
                            tags: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'Tags for categorization'
                            },
                            metadata: {
                                type: 'object',
                                description: 'Additional metadata'
                            },
                        },
                        required: ['name', 'content'],
                    },
                },
                {
                    name: 'context_get',
                    description: 'Retrieve a context by name or ID',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            nameOrId: { type: 'string', description: 'Context name or ID' },
                        },
                        required: ['nameOrId'],
                    },
                },
                {
                    name: 'context_list',
                    description: 'List all contexts',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            tag: { type: 'string', description: 'Filter by tag' },
                        },
                    },
                },
                {
                    name: 'context_update',
                    description: 'Update an existing context',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Context ID' },
                            name: { type: 'string', description: 'New name' },
                            content: { type: 'string', description: 'New content' },
                            tags: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'New tags'
                            },
                            metadata: {
                                type: 'object',
                                description: 'New metadata'
                            },
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'context_delete',
                    description: 'Delete a context',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', description: 'Context ID to delete' },
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'context_search',
                    description: 'Search contexts by content',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            query: { type: 'string', description: 'Search query' },
                        },
                        required: ['query'],
                    },
                },
            ],
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            switch (request.params.name) {
                case 'context_save':
                    return this.saveContext(request.params.arguments);
                case 'context_get':
                    return this.getContext(request.params.arguments);
                case 'context_list':
                    return this.listContexts(request.params.arguments);
                case 'context_update':
                    return this.updateContext(request.params.arguments);
                case 'context_delete':
                    return this.deleteContext(request.params.arguments);
                case 'context_search':
                    return this.searchContexts(request.params.arguments);
                default:
                    throw new Error(`Unknown tool: ${request.params.name}`);
            }
        });
    }
    async saveContext(args) {
        const context = {
            id: `ctx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: args.name,
            content: args.content,
            tags: args.tags || [],
            metadata: args.metadata || {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        // Check if name already exists
        const existing = Array.from(this.contexts.values()).find(c => c.name === args.name);
        if (existing) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Context with name "${args.name}" already exists. Use context_update to modify it.`,
                    },
                ],
            };
        }
        this.contexts.set(context.id, context);
        await this.saveContexts();
        return {
            content: [
                {
                    type: 'text',
                    text: `Context saved successfully!\nID: ${context.id}\nName: ${context.name}`,
                },
            ],
        };
    }
    getContext(args) {
        let context;
        // Try to find by ID first
        context = this.contexts.get(args.nameOrId);
        // If not found, try to find by name
        if (!context) {
            context = Array.from(this.contexts.values()).find(c => c.name === args.nameOrId);
        }
        if (!context) {
            throw new Error(`Context not found: ${args.nameOrId}`);
        }
        return {
            content: [
                {
                    type: 'text',
                    text: `# ${context.name}\n\n${context.content}\n\n---\nID: ${context.id}\nTags: ${context.tags?.join(', ') || 'none'}\nCreated: ${new Date(context.createdAt).toLocaleString()}`,
                },
            ],
        };
    }
    listContexts(args) {
        let contexts = Array.from(this.contexts.values());
        if (args.tag) {
            contexts = contexts.filter(c => c.tags?.includes(args.tag));
        }
        contexts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        if (contexts.length === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'No contexts found.',
                    },
                ],
            };
        }
        const contextList = contexts.map(c => `• ${c.name} (${c.id})\n  Tags: ${c.tags?.join(', ') || 'none'}\n  Updated: ${new Date(c.updatedAt).toLocaleString()}`).join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `Found ${contexts.length} context(s):\n\n${contextList}`,
                },
            ],
        };
    }
    async updateContext(args) {
        const context = this.contexts.get(args.id);
        if (!context) {
            throw new Error(`Context not found: ${args.id}`);
        }
        if (args.name !== undefined)
            context.name = args.name;
        if (args.content !== undefined)
            context.content = args.content;
        if (args.tags !== undefined)
            context.tags = args.tags;
        if (args.metadata !== undefined)
            context.metadata = args.metadata;
        context.updatedAt = new Date().toISOString();
        this.contexts.set(args.id, context);
        await this.saveContexts();
        return {
            content: [
                {
                    type: 'text',
                    text: `Context updated successfully: ${context.name}`,
                },
            ],
        };
    }
    async deleteContext(args) {
        if (!this.contexts.has(args.id)) {
            throw new Error(`Context not found: ${args.id}`);
        }
        const context = this.contexts.get(args.id);
        this.contexts.delete(args.id);
        await this.saveContexts();
        return {
            content: [
                {
                    type: 'text',
                    text: `Context deleted: ${context.name}`,
                },
            ],
        };
    }
    searchContexts(args) {
        const query = args.query.toLowerCase();
        const results = Array.from(this.contexts.values()).filter(c => c.name.toLowerCase().includes(query) ||
            c.content.toLowerCase().includes(query) ||
            c.tags?.some(t => t.toLowerCase().includes(query)));
        if (results.length === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `No contexts found matching "${args.query}"`,
                    },
                ],
            };
        }
        const resultList = results.map(c => {
            const preview = c.content.substring(0, 100).replace(/\n/g, ' ');
            return `• ${c.name} (${c.id})\n  Preview: ${preview}${c.content.length > 100 ? '...' : ''}\n  Tags: ${c.tags?.join(', ') || 'none'}`;
        }).join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `Found ${results.length} context(s) matching "${args.query}":\n\n${resultList}`,
                },
            ],
        };
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Context7 MCP server running...');
    }
}
const server = new Context7Server();
server.run().catch(console.error);
