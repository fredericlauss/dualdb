import { useFetch } from "@/hooks";
import { routes } from "@/services/api/routes";
import { useRouter } from "next/navigation";


const Home = async () => {

    const router = useRouter();

    const isAuthenticated = await routes.users.current();
    if (isAuthenticated) return router.push('/login');

    const notes = useFetch('/notes', []);

    const displayNotes = () => {
        return notes.body.map(note => (
            <div className="note">
                
            </div>
        ));
    }

    return (
        <div className="home">
            
        </div>
    );
}

export default Home;