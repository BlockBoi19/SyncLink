class MultiplayerExtension {
    // This is a class definition that serves as the main structure for creating the Multiplayer extension in Scratch.
    // A class is a blueprint for objects, and here it represents our custom Scratch extension for multiplayer functionality.
    // MultiplayerExtension is the name of the class, following standard JavaScript naming conventions.
    // The class will contain methods (functions) and properties (data) that define the multiplayer features.
    // By defining a class, we create a reusable structure for all multiplayer-related functionalities in Scratch.
    // This allows us to organize the code into methods, such as connecting to a server, sending messages, etc.
    // The class also defines what Scratch blocks (commands) will appear in the Scratch interface for users to interact with.
    // These blocks will allow users to use multiplayer functions without needing to know how the code works.
    // The class will later be registered with Scratch as a custom extension, making the blocks available.
    // In Scratch, extensions are external plugins that allow developers to add new capabilities.
    // Scratch blocks correspond to specific methods in this class, each representing a multiplayer action.
    // The class contains methods for handling server connections, broadcasting messages, and manipulating shared data.
    // We'll use WebSocket (a protocol for communication over the internet) to enable real-time multiplayer interaction.
    // This class also manages multiplayer state, like connection status, player lists, and shared variables.
    // In summary, this class will define all the multiplayer-related actions that can be used within Scratch.
    // The extension will allow users to create multiplayer games or applications by sending and receiving data.
    // Later, the extension will be registered to make the custom blocks usable in the Scratch environment.

    getInfo() {
        // This method is called getInfo and it provides information about the extension.
        // It returns an object containing metadata that Scratch needs to display and use the extension.
        // The object contains an id (for internal Scratch usage), a name (the display name of the extension), and blocks (commands or reporters).
        // Blocks define how the extension interacts with the Scratch user interface.
        // Each block represents a distinct function or action that the user can trigger within Scratch.
        // The "blocks" array defines the custom blocks that will appear in Scratch, such as connect, sendMessage, etc.
        // For each block, we define the block's type, its display text, and any arguments it might take.
        // Arguments are variables that the block needs to perform its function, like a URL for connecting to a server.
        // Each block has an opcode, which is a string used internally to identify which function the block should trigger.
        // blockType specifies what kind of block it is: COMMAND (action block), HAT (event block), or BOOLEAN (returns true/false).
        // The text property specifies how the block will appear visually in the Scratch editor.
        // Some blocks have arguments, which are inputs from the user (like a URL or message).
        // The defaultValue property provides a placeholder text or value for the arguments.
        // Blocks like "connect to [URL]" will trigger a method in this class that handles the connection to a server.
        // HAT blocks (e.g., "when message received") are event listeners that trigger actions when something happens (e.g., receiving a message).
        // BOOLEAN blocks (e.g., "has Internet") return true or false based on certain conditions (like if the user is online).
        // Scratch.ArgumentType.STRING indicates that an argument is expected to be a text string.
        // Scratch.ArgumentType.NUMBER indicates that an argument is expected to be a number.
        return {
            id: 'multiplayer', // The internal identifier for the extension (used within Scratch).
            name: 'Multiplayer', // The name of the extension that will appear in Scratch's extension blocks list.
            blocks: [ // The array that defines all the blocks (commands) that this extension provides.
                {
                    opcode: 'connect', // The internal method that gets called when the "connect" block is triggered.
                    blockType: Scratch.BlockType.COMMAND, // This is a command block that performs an action without returning a value.
                    text: 'connect to [URL]', // The text that users will see in the Scratch block, with [URL] as a user-provided input.
                    arguments: { // The arguments that the block takes. In this case, it's just the URL to connect to.
                        URL: {
                            type: Scratch.ArgumentType.STRING, // The URL is expected to be a string (web address).
                            defaultValue: 'ws://example.com' // The default value of the URL argument that appears in the block.
                        }
                    }
                },
                {
                    opcode: 'sendMessage', // The method that gets called when the "send message" block is used.
                    blockType: Scratch.BlockType.COMMAND, // This is another command block that performs an action (sending a message).
                    text: 'send [MESSAGE]', // The text shown in the block, with [MESSAGE] as a user input.
                    arguments: { // The block takes one argument: the message to send.
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING, // The message should be a string (text).
                            defaultValue: 'Hello' // The default message that appears in the block.
                        }
                    }
                },
                {
                    opcode: 'onMessage', // The method triggered when a message is received from the server.
                    blockType: Scratch.BlockType.HAT, // This is an event block (HAT block) that triggers when something happens.
                    text: 'when message received', // The block text that shows when this event occurs.
                },
                {
                    opcode: 'hasInternet', // The method for checking if there's an internet connection.
                    blockType: Scratch.BlockType.BOOLEAN, // This is a BOOLEAN block that returns true/false.
                    text: 'has Internet', // The text shown in the block for checking internet availability.
                },
                {
                    opcode: 'isConnected', // The method to check if the user is connected to the multiplayer server.
                    blockType: Scratch.BlockType.BOOLEAN, // Another BOOLEAN block, returning true/false.
                    text: 'is connected', // The text shown in the block for checking if the user is connected.
                },
                {
                    opcode: 'failedToConnect', // The method triggered when the connection to the server fails.
                    blockType: Scratch.BlockType.HAT, // This is an event block (HAT block) for connection failure events.
                    text: 'when failed to connect', // The block text shown when a connection failure event occurs.
                },
                {
                    opcode: 'login', // The method called when the user logs in with a username and password.
                    blockType: Scratch.BlockType.COMMAND, // A command block for performing the login action.
                    text: 'login with username [USERNAME] and password [PASSWORD]', // Block text with user inputs for username and password.
                    arguments: { // Arguments the block takes: a username and password.
                        USERNAME: {
                            type: Scratch.ArgumentType.STRING, // The username should be a string (text).
                            defaultValue: 'username' // The default username shown in the block.
                        },
                        PASSWORD: {
                            type: Scratch.ArgumentType.STRING, // The password should be a string (text).
                            defaultValue: 'password' // The default password shown in the block.
                        }
                    }
                },
                {
                    opcode: 'isLoggedIn', // The method for checking if the user is logged in.
                    blockType: Scratch.BlockType.BOOLEAN, // A BOOLEAN block that returns true/false.
                    text: 'is logged in', // The text shown in the block for checking the login status.
                },
                {
                    opcode: 'sendEmail', // The method for sending an email.
                    blockType: Scratch.BlockType.COMMAND, // A command block that performs the action of sending an email.
                    text: 'send email to [EMAIL] with subject [SUBJECT] and body [BODY]', // Block text with user inputs for email details.
                    arguments: { // Arguments for the block: recipient's email, subject, and body of the email.
                        EMAIL: {
                            type: Scratch.ArgumentType.STRING, // The email address should be a string (text).
                            defaultValue: 'example@example.com' // The default email shown in the block.
                        },
                        SUBJECT: {
                            type: Scratch.ArgumentType.STRING, // The subject of the email should be a string (text).
                            defaultValue: 'Hello' // The default subject shown in the block.
                        },
                        BODY: {
                            type: Scratch.ArgumentType.STRING, // The body of the email should be a string (text).
                            defaultValue: 'This is a test email.' // The default body text shown in the block.
                        }
                    }
                },
                {
                    opcode: 'onEmailReceived', // The method triggered when an email is received.
                    blockType: Scratch.BlockType.HAT, // An event block (HAT block) for email reception events.
                    text: 'when email received', // The block text shown when an email is received.
                },

                // New blocks
                {
                    opcode: 'disconnect', // The method called when the user wants to disconnect from the server.
                    blockType: Scratch.BlockType.COMMAND, // A command block for disconnecting.
                    text: 'disconnect', // The text shown in the block to disconnect the user from the server.
                },
                {
                    opcode: 'onDisconnect', // The method triggered when the user is disconnected from the server.
                    blockType: Scratch.BlockType.HAT, // An event block (HAT block) for disconnection events.
                    text: 'when disconnected', // The block text shown when the user is disconnected.
                },
                {
                    opcode: 'getUsername', // The method for retrieving the current user's username.
                    blockType: Scratch.BlockType.REPORTER, // A reporter block that returns the username.
                    text: 'get username', // The text shown in the block to retrieve the username.
                },
                {
                    opcode: 'getServerTime', // The method for retrieving the current server time.
                    blockType: Scratch.BlockType.REPORTER, // A reporter block that returns the server time.
                    text: 'get server time', // The text shown in the block to retrieve the server time.
                },

                // New multiplayer blocks
                {
                    opcode: 'broadcast', // The method for broadcasting a message to all connected players.
                    blockType: Scratch.BlockType.COMMAND, // A command block for sending a broadcast message.
                    text: 'broadcast [MESSAGE]', // Block text with user input for the message to broadcast.
                    arguments: { // The argument for the block: the message to broadcast.
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING, // The message should be a string (text).
                            defaultValue: 'message' // The default message shown in the block.
                        }
                    }
                },
                {
                    opcode: 'whenIReceive', // The method triggered when a specific message is received.
                    blockType: Scratch.BlockType.HAT, // An event block (HAT block) for receiving messages.
                    text: 'when I receive [MESSAGE]', // Block text with user input for the message to listen for.
                    arguments: { // The argument for the block: the message to trigger the event.
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING, // The message should be a string (text).
                            defaultValue: 'message' // The default message shown in the block.
                        }
                    }
                },
                {
                    opcode: 'getPlayers', // The method for retrieving the list of currently connected players.
                    blockType: Scratch.BlockType.REPORTER, // A reporter block that returns the list of players.
                    text: 'get players', // The text shown in the block to retrieve the player list.
                },
                {
                    opcode: 'getPlayerCount', // The method for retrieving the current number of connected players.
                    blockType: Scratch.BlockType.REPORTER, // A reporter block that returns the player count.
                    text: 'get player count', // The text shown in the block to retrieve the player count.
                },
                {
                    opcode: 'getPlayerUsername', // The method for retrieving a specific player's username.
                    blockType: Scratch.BlockType.REPORTER, // A reporter block that returns a specific player's username.
                    text: 'get player username [INDEX]', // Block text with user input for the player index to retrieve the username.
                    arguments: { // The argument for the block: the index of the player.
                        INDEX: {
                            type: Scratch.ArgumentType.NUMBER, // The index should be a number.
                            defaultValue: 1 // The default index value shown in the block.
                        }
                    }
                },
                {
                    opcode: 'setVariableForAll', // The method for setting a variable for all players to a specific value.
                    blockType: Scratch.BlockType.COMMAND, // A command block for setting a variable.
                    text: 'set [VARIABLE] for all to [VALUE]', // Block text with user inputs for the variable name and value.
                    arguments: { // The arguments for the block: the variable name and the value to set.
                        VARIABLE: {
                            type: Scratch.ArgumentType.STRING, // The variable name should be a string.
                            defaultValue: 'myVariable' // The default variable name shown in the block.
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.NUMBER, // The value should be a number.
                            defaultValue: 0 // The default value shown in the block.
                        }
                    }
                },
                {
                    opcode: 'changeVariableForAll', // The method for changing a variable's value for all players by a specific amount.
                    blockType: Scratch.BlockType.COMMAND, // A command block for changing a variable's value.
                    text: 'change [VARIABLE] for all by [VALUE]', // Block text with user inputs for the variable name and value to change by.
                    arguments: { // The arguments for the block: the variable name and the value to change by.
                        VARIABLE: {
                            type: Scratch.ArgumentType.STRING, // The variable name should be a string.
                            defaultValue: 'myVariable' // The default variable name shown in the block.
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.NUMBER, // The value should be a number.
                            defaultValue: 1 // The default value to change by shown in the block.
                        }
                    }
                }
            ]
        };
    }

    broadcast(args) {
        // This method broadcasts a message to all connected players.
        // It takes one argument: the message to send.
        // First, it checks if a socket connection exists and if the connection is active.
        // If a connection exists and is active, it sends the message as a JSON object to the server.
        // The message is wrapped in an object with a "type" field set to "broadcast" to indicate the type of action.
        // The "message" field contains the actual content of the message provided by the user.
        // JSON.stringify is used to convert the object into a JSON string before sending it over the network.
        // This ensures the data is transmitted in a format the server can easily parse.
        // If the connection is not established, the method will do nothing.
        // This prevents sending messages when the user is not connected to the server.
        if (this.socket && this.connected) {
            this.socket.send(JSON.stringify({
                type: 'broadcast', // The action type is broadcast, so the server knows how to handle it.
                message: args.MESSAGE // The message content to be sent, as specified by the user in the Scratch block.
            }));
        }
    }

    getPlayers() {
        // This method retrieves the list of currently connected players.
        // The method is a placeholder that can later be expanded with actual server logic.
        // For now, it returns an empty array to indicate no players are connected.
        // In the future, this might involve sending a request to the server for the player list.
        // The server would respond with a list of player usernames, which can then be returned to the Scratch block.
        // This array will be displayed in the Scratch interface when the block is used.
        return []; // Placeholder for now: an empty array indicating no players.
    }

    getPlayerCount() {
        // This method returns the number of connected players.
        // Like getPlayers, this is a placeholder method.
        // Eventually, this will send a request to the server to get the current player count.
        // For now, it simply returns 0, indicating no players are connected.
        // This will be useful for displaying the number of players in the game or chat room.
        // When the server is integrated, this method will return the actual number of players.
        return 0; // Placeholder for now: zero players.
    }

    getPlayerUsername(args) {
        // This method retrieves the username of a specific player based on their index in the player list.
        // The index is provided as an argument by the user in the Scratch block.
        // The method is a placeholder that will eventually use the getPlayers method to get the player list.
        // The player list is an array, and the index allows us to access a specific player's username.
        // For now, it simply returns a placeholder username ("Player " + index).
        // In the future, the username will be fetched from the server or a stored list of players.
        return 'Player ' + args.INDEX; // Placeholder for now: a generic username based on the index.
    }

    setVariableForAll(args) {
        // This method sets a variable for all players to a specific value.
        // It takes two arguments: the name of the variable and the value to set it to.
        // First, it checks if a socket connection exists and if the connection is active.
        // If a connection exists, it sends a JSON object to the server to update the variable.
        // The object contains the action type ("setVariable"), the variable name, and the value.
        // The server will receive this data and distribute the updated variable value to all players.
        // This allows real-time sharing of game state or other important data between players.
        if (this.socket && this.connected) {
            this.socket.send(JSON.stringify({
                type: 'setVariable', // The action type is setVariable, so the server knows what to do.
                variable: args.VARIABLE, // The variable name, as specified by the user in the Scratch block.
                value: args.VALUE // The value to set the variable to, as specified by the user.
            }));
        }
    }

    changeVariableForAll(args) {
        // This method changes the value of a variable for all players by a specific amount.
        // It takes two arguments: the name of the variable and the value to change it by.
        // First, it checks if a socket connection exists and if the connection is active.
        // If a connection exists, it sends a JSON object to the server to update the variable.
        // The object contains the action type ("changeVariable"), the variable name, and the amount to change by.
        // The server will receive this data and update the variable value for all players.
        // This is useful for scenarios where a shared state needs to be modified in real-time.
        if (this.socket && this.connected) {
            this.socket.send(JSON.stringify({
                type: 'changeVariable', // The action type is changeVariable, so the server knows what to do.
                variable: args.VARIABLE, // The variable name, as specified by the user in the Scratch block.
                value: args.VALUE // The amount to change the variable by, as specified by the user.
            }));
        }
    }
}

// Register the MultiplayerExtension with Scratch.
Scratch.extensions.register(new MultiplayerExtension()); // This line registers the extension with Scratch, making it available for use.
