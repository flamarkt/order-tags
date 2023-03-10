import app from 'flamarkt/backoffice/backoffice/app';
import {Children} from 'mithril';
import AbstractShowPage from 'flamarkt/backoffice/common/pages/AbstractShowPage';
import SubmitButton from 'flamarkt/backoffice/backoffice/components/SubmitButton';
import RichTextInput from 'flamarkt/backoffice/backoffice/components/RichTextInput';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Switch from 'flarum/common/components/Switch';
import ItemList from 'flarum/common/utils/ItemList';
import Tag from '../../common/models/Tag';

export default class TagShowPage extends AbstractShowPage {
    tag: Tag | null = null;
    dirty: boolean = false;
    saving: boolean = false;
    slug: string = '';
    name: string = '';
    description: string = '';
    icon: string = '';
    color: string = '';
    isPrimary: boolean = false;
    visibleCustomer: boolean = false;
    notifyCustomer: boolean = false;
    notifySubject: string = '';
    notifyMessage: string = '';

    newRecord() {
        return app.store.createRecord('flamarkt-order-tags');
    }

    findType() {
        return 'flamarkt/order-tags';
    }

    show(tag: Tag) {
        this.tag = tag;
        this.slug = tag.slug() || '';
        this.name = tag.name() || '';
        this.description = tag.description() || '';
        this.icon = tag.icon() || '';
        this.color = tag.color() || '';
        this.isPrimary = !!tag.isPrimary();
        this.visibleCustomer = !!tag.visibleCustomer();
        this.notifyCustomer = !!tag.notifyCustomer();
        this.notifySubject = tag.notifySubject() || '';
        this.notifyMessage = tag.notifyMessage() || '';

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

        fields.add('slug', m('.Form-group', [
            m('label', 'Slug'),
            m('input.FormControl', {
                type: 'text',
                value: this.slug,
                oninput: (event: Event) => {
                    this.slug = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]));

        fields.add('name', m('.Form-group', [
            m('label', 'Name'),
            m('input.FormControl', {
                type: 'text',
                value: this.name,
                oninput: (event: Event) => {
                    this.name = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]));

        fields.add('description', m('.Form-group', [
            m('label', 'Description'),
            m(RichTextInput, {
                value: this.description,
                onchange: (value: string) => {
                    this.description = value;
                    this.dirty = true;

                    m.redraw();
                },
                disabled: this.saving,
            }),
        ]));

        fields.add('icon', m('.Form-group', [
            m('label', 'Icon'),
            m('input.FormControl', {
                type: 'text',
                value: this.icon,
                oninput: (event: Event) => {
                    this.icon = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]));

        fields.add('color', m('.Form-group', [
            m('label', 'Color'),
            m('input.FormControl', {
                type: 'text',
                value: this.color,
                oninput: (event: Event) => {
                    this.color = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]));

        fields.add('isPrimary', m('.Form-group', [
            Switch.component({
                state: this.isPrimary,
                onchange: (state: boolean) => {
                    this.isPrimary = state;
                    this.dirty = true;
                },
                disabled: this.saving,
            }, 'Primary tag'),
        ]));

        fields.add('visibleCustomer', m('.Form-group', [
            Switch.component({
                state: this.visibleCustomer,
                onchange: (state: boolean) => {
                    this.visibleCustomer = state;
                    this.dirty = true;
                },
                disabled: this.saving,
            }, 'Visible to customer'),
        ]));

        fields.add('notifyCustomer', m('.Form-group', [
            Switch.component({
                state: this.notifyCustomer,
                onchange: (state: boolean) => {
                    this.notifyCustomer = state;
                    this.dirty = true;
                },
                disabled: this.saving,
            }, 'Notify customer when added'),
        ]));

        fields.add('notifySubject', m('.Form-group', [
            m('label', 'Notification Subject'),
            m('input.FormControl', {
                type: 'text',
                value: this.notifySubject,
                oninput: (event: Event) => {
                    this.notifySubject = (event.target as HTMLInputElement).value;
                    this.dirty = true;
                },
                disabled: this.saving || (!this.notifyCustomer && !this.notifySubject),
            }),
        ]));

        fields.add('notifyMessage', m('.Form-group', [
            m('label', 'Notification Message'),
            m(RichTextInput, {
                value: this.notifyMessage,
                onchange: (value: string) => {
                    this.notifyMessage = value;
                    this.dirty = true;

                    m.redraw();
                },
                disabled: this.saving || (!this.notifyCustomer && !this.notifyMessage),
            }),
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
            slug: this.slug,
            name: this.name,
            description: this.description,
            icon: this.icon,
            color: this.color,
            isPrimary: this.isPrimary,
            visibleCustomer: this.visibleCustomer,
            notifyCustomer: this.notifyCustomer,
            notifySubject: this.notifySubject,
            notifyMessage: this.notifyMessage,
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
