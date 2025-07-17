const { updateNewsCacheCron } = require("../schedulers/updateNewsCacheCron");

const runSchedulers = () => {
    updateNewsCacheCron();
}
runSchedulers();