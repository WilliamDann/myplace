import Logs from './services/Shared/Logs';
import App  from './App';

const app = App()

const host = process.env.HOST ? process.env.HOST : 'localhost'
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080

// start app
app.listen(port, host, () => {
    Logs.info(`app started on ${host}:${port}`)
    console.log(`listening on ${host}:${port}`)
})