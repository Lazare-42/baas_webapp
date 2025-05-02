// Simple CORS proxy for MCP server
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3002 // Use a different port

// Enable CORS for all routes
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
        credentials: false,
    }),
)

// Parse JSON request bodies
app.use(bodyParser.json())

// Proxy endpoint for MCP
app.post('/proxy-mcp', async (req, res) => {
    try {
        console.log(
            'Received request to proxy-mcp:',
            JSON.stringify(req.body, null, 2),
        )
        console.log('Headers:', req.headers)

        // Extract API key from query params or headers
        const apiKey = req.query.apiKey || req.headers['x-api-key']

        if (!apiKey) {
            return res.status(400).json({
                error: {
                    code: 400,
                    message: 'API key is required',
                },
            })
        }

        // Forward request to MCP server
        const response = await axios.post(
            'http://localhost:7017/mcp',
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
            },
        )

        console.log('MCP server response:', response.data)

        // Return the response from MCP server
        return res.json(response.data)
    } catch (error) {
        console.error('Error proxying request to MCP server:', error)

        if (axios.isAxiosError(error) && error.response) {
            // Forward the error from the MCP server
            return res.status(error.response.status).json(error.response.data)
        }

        // For other errors
        return res.status(500).json({
            error: {
                code: 500,
                message: `Failed to proxy request: ${error.message}`,
            },
        })
    }
})

// Start the server
app.listen(port, () => {
    console.log(`CORS proxy server running at http://localhost:${port}`)
})
