import { Application } from 'express';
import account from './account';
import auth from './auth';
import Logs from '../../Shared/Logs';

export default function(app: Application) {
    account(app);
    auth(app);

    Logs.info('accounts service registered');
}