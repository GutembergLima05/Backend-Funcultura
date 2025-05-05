const { routeDocumentos } = require("./cadastroRoutes/cadastroRouter");
const { routeUser } = require("./userRoutes/userRouter");

const allRoutes = [
    routeUser,
    routeDocumentos
];

module.exports = { allRoutes };