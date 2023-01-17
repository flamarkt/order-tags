import app from 'flamarkt/backoffice/backoffice/app';
import {extend} from 'flarum/common/extend';
import ActiveLinkButton from 'flamarkt/backoffice/common/components/ActiveLinkButton';
import BackofficeNav from 'flamarkt/backoffice/backoffice/components/BackofficeNav';
import TagIndexPage from './pages/TagIndexPage';
import TagShowPage from './pages/TagShowPage';
import {backoffice} from './compat';
import {common} from '../common/compat';
import addModels from '../common/addModels';
import extendOrderIndex from './extendOrderIndex';
import extendOrderShow from './extendOrderShow';

export {
    backoffice,
    common,
};

app.initializers.add('flamarkt-order-tags', () => {
    addModels();
    extendOrderIndex();
    extendOrderShow();

    app.routes['orderTags.index'] = {
        path: '/order-tags',
        component: TagIndexPage,
    };
    app.routes['orderTags.show'] = {
        path: '/order-tags/:id',
        component: TagShowPage,
    };

    extend(BackofficeNav.prototype, 'items', function (items) {
        items.add('order-tags', ActiveLinkButton.component({
            href: app.route('orderTags.index'),
            icon: 'fas fa-tag',
            activeRoutes: [
                'orderTags.*',
            ],
        }, 'Order Tags'));
    });
});
