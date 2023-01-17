import app from 'flamarkt/backoffice/backoffice/app';
import {Children} from 'mithril';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import SubmitButton from 'flamarkt/backoffice/backoffice/components/SubmitButton';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Switch from 'flarum/common/components/Switch';
import ItemList from 'flarum/common/utils/ItemList';
import Tag from '../../common/models/Tag';

export default class TagShowPage extends AbstractShowPage {
    tag: Tag | null = null;
    dirty: boolean = false;
    saving: boolean = false;
    name: string = '';
    visibleCustomer: boolean = false;
    notifyCustomer: boolean = false;

    newRecord() {
        return app.store.createRecord('flamarkt-order-tags');
    }

    findType() {
        return 'flamarkt/order-tags';
    }

    show(tag: Tag) {
        this.tag = tag;
        this.name = tag.name() || '';
        this.visibleCustomer = !!tag.visibleCustomer();
        this.notifyCustomer = !!tag.notifyCustomer();

        app.setTitle(tag.name());
        app.setTitleCount(0);
    }

    view() {
        if (!this.tag) {
            return LoadingIndicator.component();
        }

        return m('form.OrderTagShowPage', {
            onsubmit: this.onsubmit.bind(this),
        }, m('.container', this.fields().toArray()));
    }

    fields(): ItemList<Children> {
        const fields = new ItemList<Children>();

        fields.add('name', m('.Form-group', [
            m('label', 'Name'),
            m('input.FormControl', {
                type: 'text',
                value: this.name,
                oninput: (event: Event) => {
                    this.name = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
            }),
        ]));

        fields.add('visibleCustomer', m('.Form-group', [
            Switch.component({
                state: this.visibleCustomer,
                onchange: (state: boolean) => {
                    this.visibleCustomer = state;
                    this.dirty = true;
                },
            }, 'Visible to customer'),
        ]));

        fields.add('notifyCustomer', m('.Form-group', [
            Switch.component({
                state: this.notifyCustomer,
                onchange: (state: boolean) => {
                    this.notifyCustomer = state;
                    this.dirty = true;
                },
            }, 'Notify customer when added'),
        ]));

        fields.add('submit', m('.Form-group', [
            SubmitButton.component({
                loading: this.saving,
                dirty: this.dirty,
                exists: this.tag!.exists,
            }),
        ]), -10);

        return fields;
    }

    data() {
        return {
            name: this.name,
            visibleCustomer: this.visibleCustomer,
            notifyCustomer: this.notifyCustomer,
        };
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.saving = true;

        this.tag!.save(this.data()).then(tag => {
            this.tag = tag;

            this.saving = false;
            this.dirty = false;
            m.redraw();

            m.route.set(app.route('orderTags.show', {
                id: tag.id(),
            }));
        }).catch(error => {
            this.saving = false;
            m.redraw();
        });
    }
}
