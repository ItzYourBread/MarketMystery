import { ready } from '../listeners/ready';
import { error } from '../listeners/error';
import { shardReady } from '../listeners/shardReady';
import { interactionCreate } from '../listeners/interactionCreate';
declare const _default: {
    ready: typeof ready;
    error: typeof error;
    shardReady: typeof shardReady;
    interactionCreate: typeof interactionCreate;
};
export default _default;
