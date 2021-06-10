import Loading from "./Loading";
import { SyntheticEvent, useState } from "react";
import { useUser } from "../context/user";
import { firebase, firestore } from "../services/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface IMessage {
    id: string,
    text: string,
    udi: string,
    photoURL: string,
    displayName: string,
    createAt: firebase.firestore.Timestamp
}

const messagesRef = firestore.collection("anime");
const messagesQuery = messagesRef.orderBy("createdAt", "asc").limit(100);

const Anime = () => {
    const [text, setText] = useState ("");
    const { logout, user } = useUser();
    const [messages, loading] = useCollectionData<IMessage>(
        messagesQuery, 
        { idField: "id" }
    );

    const sendMessage =(event: SyntheticEvent) => {
        event.preventDefault();

        if(text.trim().length < 1) return;

        if(user){
            const { displayName, photoURL, uid } = user;
            messagesRef.add({
                text,
                uid,
                photoURL,
                displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setText("");
    };

    if(loading){

        return (
            <Loading />
        )
    }

    return (
        <section>
            <section>
                { messages && messages.map(({ text, displayName, photoURL, id }) => (
                    <div>
                        [<img src={photoURL} width="16" height="16" alt={displayName} style={{borderRadius:"99rem"  }} />{displayName}]: {text}
                    </div>
                )) } 
            </section>
            <form onSubmit={sendMessage}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button>send</button>
            </form>
			<button onClick={logout}>Logout</button>
        </section>
    )
}

export default Anime;