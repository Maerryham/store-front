"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const product_route_1 = __importDefault(require("./handlers/product_route"));
const user_route_1 = __importDefault(require("./handlers/user_route"));
const order_route_1 = __importDefault(require("./handlers/order_route"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.listen(3000, function () {
    console.log(`Server is running on ${address}`);
});
//Log request
app.use((0, morgan_1.default)('tiny'));
//Load Routers
app.use('/api', product_route_1.default);
app.use('/api', user_route_1.default);
app.use('/api', order_route_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
