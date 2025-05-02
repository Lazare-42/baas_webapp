import axios from 'axios'

// Use our CORS proxy instead of connecting directly to MCP server
// This proxy will handle the CORS issues and forward requests to the MCP server
const PROXY_URL = 'http://localhost:3002/proxy-mcp'

// Types for MCP requests and responses
export interface MCPRequest {
    jsonrpc: string
    id: string
    method: string
    params: {
        name: string
        arguments: Record<string, any>
    }
}

export interface MCPResponseError {
    code: number
    message: string
}

export interface MCPResponse {
    id: string
    result?: {
        content: Array<{
            type: string
            text: string
        }>
    }
    error?: MCPResponseError
}

/**
 * Send a request to the MCP server through our CORS proxy
 */
export async function sendMCPRequest(
    request: MCPRequest,
    apiKey: string,
): Promise<MCPResponse> {
    try {
        console.log(
            `Sending request through CORS proxy: ${PROXY_URL}`,
            JSON.stringify(request, null, 2),
        )

        // Ensure the request is properly formatted according to JSON-RPC spec
        if (!request.jsonrpc) {
            request.jsonrpc = '2.0'
        }

        if (!request.id) {
            request.id = Date.now().toString()
        }

        if (!request.method) {
            console.error('Missing method in MCP request')
            throw new Error('Missing method in MCP request')
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        }

        const response = await axios.post<MCPResponse>(PROXY_URL, request, {
            headers,
            timeout: 10000, // 10 seconds timeout
        })

        console.log(`Received response from CORS proxy:`, response.data)
        return response.data
    } catch (error) {
        console.error('Error sending request to CORS proxy:', error)

        if (axios.isAxiosError(error) && error.response) {
            // Return the error response from the server
            console.error('Server response:', error.response.data)
            console.error('Status code:', error.response.status)
            console.error('Headers:', error.response.headers)
            return error.response.data as MCPResponse
        }

        // For network errors or other issues, create a generic error response
        return {
            id: request.id || Date.now().toString(),
            error: {
                code: 500,
                message: `Failed to connect to CORS proxy: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
        }
    }
}

/**
 * Helper function to call a specific MCP tool
 */
export async function callMCPTool(
    toolName: string,
    args: Record<string, any>,
    apiKey: string,
): Promise<MCPResponse> {
    const requestId = Date.now().toString()

    const request: MCPRequest = {
        jsonrpc: '2.0',
        id: requestId,
        method: 'call_tool',
        params: {
            name: toolName,
            arguments: args,
        },
    }

    return sendMCPRequest(request, apiKey)
}

/**
 * List available tools on the MCP server
 */
export async function listMCPTools(apiKey: string): Promise<MCPResponse> {
    const requestId = Date.now().toString()

    const request: MCPRequest = {
        jsonrpc: '2.0',
        id: requestId,
        method: 'list_tools',
        params: {
            name: '',
            arguments: {},
        },
    }

    return sendMCPRequest(request, apiKey)
}
