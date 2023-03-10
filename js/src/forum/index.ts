import app from 'flarum/forum/app';
import {forum} from './compat';
import {common} from '../common/compat';
import addModels from '../common/addModels';
import showStatusInOrderList from './showStatusInOrderList';
import showStatusOnOrderFacts from './showStatusOnOrderFacts';

export {
    forum,
    common,
};

app.initializers.add('flamarkt-order-tags', () => {
    addModels();
    showStatusInOrderList();
    showStatusOnOrderFacts();
});
