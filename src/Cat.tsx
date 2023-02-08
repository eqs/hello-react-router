import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface CatCategory {
  id: number;
  name: string;
}

interface SearchCatImage {
  breeds: string[];
  categories: CatCategory[];
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[];

const catImages: string[] = [
  "https://cdn2.thecatapi.com/images/bpc.jpg",
  "https://cdn2.thecatapi.com/images/eac.jpg",
  "https://cdn2.thecatapi.com/images/6qi.jpg",
];

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await axios.get<SearchCatImageResponse>("https://api.thecatapi.com/v1/images/search");
  return res.data[0];
};

fetchCatImage().then((image) => {
  console.log(`Image URL: ${image}`);
});

const randomCatImage = (): string => {
  const index = Math.floor(Math.random() * catImages.length);
  return catImages[index];
};

const Cat = () => {
  const [catImageUrl, setCatImageUrl] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    const image = await fetchCatImage();
    setCatImageUrl(image.url);
  };

  return (
    <div className="Cat">
      <h1>Hello, React 👋</h1>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px",
        }}
      >
        きょうのにゃんこ😺
      </button>
      <div style={{
        marginTop: 8,
        maxWidth: 500,
      }}>
      {typeof catImageUrl == "string"
        ? <img src={catImageUrl} width="100%" height="auto" alt="cat" />
        : <div style={{
            backgroundColor: "#F6F3F6",
            color: "#232623",
            width: "100%",
            height: "auto",
            textAlign: "center",
            padding: "16px 8px",
        }}>ボタンおしてね</div>
      }
      </div>
      <p>
        <Link to={`/`}>もどる</Link>
      </p>
    </div>
  );
};

export default Cat;
