import { FC, useState } from 'react';
import { Form, FormHandler } from '@/modules/Form';
import { Requests } from '@shared/api';
import { routes } from '@/services/api/routes';

interface Props {
    mode: 'create' | 'update';
    initialNote?: Requests.Note.Post['body'] | Requests.Note.Put['body']
    onSuccess: () => void
}

const NoteForm: FC<Props> = ({ mode, initialNote = defaultNote, onSuccess }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState(initialNote);

    const handleChanges: FormHandler<ValueOf<typeof note>> = ({ name, value }) => {
        setNote({
            ...note,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        if (mode === 'update' && !('id' in note))
            return;
        
        const success = mode === 'create'
            ? await routes.notes.create(note)
            : await routes.notes.update(note as Requests.Note.Put['body']);
        setIsLoading(false);

        if (success)
            onSuccess();
    }

    return (
        <div className='note-form form'>
            <h2>Nouvelle note</h2>
            <Form.Field 
                name='title'
                value={note.title}
                onChange={handleChanges}
                placeholder='Titre'
            />
            <Form.Field 
                name='content'
                value={note.content}
                onChange={handleChanges}
                placeholder='Contenu'
            />
            <button
                className='animated filled'
                onClick={handleSubmit}
                disabled={isLoading}
            >
                Valider
            </button>
        </div>
    );
};

const defaultNote: Requests.Note.Post['body'] = {
    title: '',
    content: ''
}

export default NoteForm;