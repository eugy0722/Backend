import Index from "./index";
require("dotenv").config();

// To open connection server
Index.listen(process.env.PORT, () => console.log("Server is running!"));
