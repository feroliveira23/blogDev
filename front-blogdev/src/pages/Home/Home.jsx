import React, { useState, useEffect } from "react";
import CardPost from "../../components/CardPost";
import { useNavigate } from "react-router-dom";
import { userFetchDocuments } from "../../hooks/userFetchDocuments";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const docCollection = "posts";
  const { documents, loading, error } = userFetchDocuments(
    docCollection,
    null,
    null
  );
  const [search, setSearch] = useState("");
  const [documentsFilter, setDocumentsFilter] = useState([]);

  useEffect(() => {
    setDocumentsFilter(documents);
  }, [documents]);

  const handleOpenPost = (id) => {
    navigate(`/post/${id}`);
  };

  const handleFilter = () => {
    setDocumentsFilter(
      documents
        ? documents.filter((doc) =>
            doc.tags.some((tag) =>
              tag.toLowerCase().includes(search.toLowerCase())
            )
          )
        : []
    );
  };

  return (
    <div className={styles.home}>
      <h1>Veja as nossas postagens mais recentes</h1>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-dark" onClick={handleFilter}>
          Pesquisar
        </button>
      </div>
      <div className="post-list">
        {documentsFilter &&
          documentsFilter.map((doc, index) => (
            <CardPost
              key={index}
              title={doc.title}
              image={doc.image}
              createBy={doc.createBy}
              tags={doc.tags}
              onOpen={() => handleOpenPost(doc.id)}
            />
          ))}
        {documentsFilter && documentsFilter.length === 0 && <h2>Sem posts</h2>}
      </div>
    </div>
  );
};

export default Home;
