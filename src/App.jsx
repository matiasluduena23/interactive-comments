import CommentsList from "./components/CommentsList";
import {
  CommetsDistpachContext,
  CommetsContext,
  CurrentUserContext,
} from "./context/ComentContext";
import { comments, currentUser } from "./data/data.json";
import commentReducer from "./reducer/commentReducer";
import { useReducer } from "react";

function App() {
  const [tasks, dispatch] = useReducer(commentReducer, comments);

  return (
    <CommetsContext.Provider value={tasks}>
      <CurrentUserContext.Provider value={currentUser}>
        <CommetsDistpachContext.Provider value={dispatch}>
          <main className="container">
            <CommentsList />
          </main>
        </CommetsDistpachContext.Provider>
      </CurrentUserContext.Provider>
    </CommetsContext.Provider>
  );
}

export default App;
