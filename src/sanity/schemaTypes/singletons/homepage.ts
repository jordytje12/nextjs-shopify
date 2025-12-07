import {defineField, defineType} from 'sanity';

export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'body', type: 'blockContent'})
    ]
})