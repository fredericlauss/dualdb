'use client';

import { Confirm, IconButton, Modal, PageLayout } from "@/components";
import { useAuthentication, useFetch, useModal } from "@/hooks";
import { NoteForm } from "./components";
import { Responses } from "@shared/api";
import { MdDelete, MdEdit } from "react-icons/md";
import { routes } from "@/services/api/routes";

const Home = () => {

    useAuthentication();

    const modal = useModal();

    const notesResponse = useFetch<Responses.Note.Get['200'], never>('/notes', []);

    const handleAddNote = () => {
        modal.openWith(
            <NoteForm 
                mode='create'
                onSuccess={onActionSuccess}
            />
        )
    }

    const handleEditNote = (note: Responses.Note.Get[200][number]) => {
        modal.openWith(
            <NoteForm 
                mode='update'
                initialNote={note}
                onSuccess={onActionSuccess}
            />
        )
    }

    const handleDeleteNote = (noteId: number) => {
        modal.openWith(
            <Confirm 
                message='Voulez-vous vraiment supprimer cette note ?'
                onConfirm={async () => {
                    const success = await routes.notes.delete(noteId);
                    if (!success) return;
                    
                    onActionSuccess();
                }}
                onCancel={modal.close}
            />
        )
    }

    const displayNotes = () => {
        return notesResponse.body.map(note => (
            <div className="note">
                <div className="top">
                    <h3>{note.title}</h3>
                    <div className="actions">
                        <IconButton
                            onClick={() => handleEditNote(note)}
                        >
                            <MdEdit />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDeleteNote(note.id)}
                        >
                            <MdDelete />
                        </IconButton>
                    </div>
                </div>
                <p>{note.content}</p>
            </div>
        ));
    }

    const onActionSuccess = () => {
        modal.close();
        notesResponse.refresh();
    }

    return (
        <PageLayout id="home-page">
            <Modal {...modal} />
            <div className="header">
                <h2>Notes</h2>
                <button
                    className="animated filled"
                    onClick={handleAddNote}
                >
                    Ajouter
                </button>
            </div>
            <div className="notes">
                {displayNotes()}
            </div>
        </PageLayout>
    );
}

export default Home;