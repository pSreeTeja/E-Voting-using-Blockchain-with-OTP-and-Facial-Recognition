Truffle framework is used to develop etherium smart contract with solidity programming language and also allows to deploy smart contracts to block chain and gives us development console

Meta mask: an extension allows us to connect to the block chain with our personal account and also helps us interact with smart contract developed.

1)Created react project and installed web3,truffle and used commands (truffle init, truffle unbox)
2)for "truffle init"- migration and contracts folder are created
3)truffle unbox- created inital_migration and Migrations.sol file
4)"Elections.sol" contract is written
5)Ganache setup is done by adding truffle-config.js to the workspace
6)"truffle migrate" command is used to deploy our contracts.
7)first add localhost7545 account manually with RPC Server URL and Chain ID 1337
8)Taken first account and linked it with metamask(new network is added and account is imported by pasting the private key)
9)config.js file created in "src" directory and ABI & ADDRESS are created and the file is exported. (both from Elections.json)
mongodb+srv://admin:Admin%40123@finalyearprojectcluster.ukecxh6.mongodb.net/?retryWrites=true&w=majority