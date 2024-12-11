import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function App() {
  //function untuk nomor 1
  const [counter, setCounter] = useState(0);

  //function untuk nomor 3
  const [calculatorInput, setCalculatorInput] = useState("");
  const [result, setresult] = useState("");
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const handleClick = (value) => {
    setCalculatorInput((prev) => prev + value);
  };
  const handleCalculte = () => {
    let count = eval(calculatorInput);
    setresult(count);
  };

  //function nomor 4
  const [link, setLink] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [imageResult, setimageResult] = useState([]);
  const crawlImagesFromUrl = () => {
    let APIKEY =
      "ZA2PHIE1XYMVKYHS9X3UM4RBGRT13UXIFUQVT3QT421LY3BSGJ6NFZSPUWVXSW812L2TM96O37SRUS27";
    setisLoading(true);
    axios
      .get(`https://app.scrapingbee.com/api/v1/?api_key=${APIKEY}&url=${link}`)
      .then((res) => {
        let result = res.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(result, "text/html");

        const images = doc.querySelectorAll("img");
        const imagesUrl = Array.from(images).map((item) => item?.src);

    
        setimageResult(imagesUrl);
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
        alert(err);
      });
  };

  //function nomor 5
  const [resultTime, setResultTime] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  let timeZone = ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura"];
  const CheckCurrentTimes = () => {
    axios
      .get(`https://timeapi.io/api/Time/current/zone?timeZone=${selectedZone}`)
      .then((res) => {
        setResultTime(res.data);
      })
      .catch((err) => {
        alert("Terjadi error");
      });
  };

  return (
    <Container>
      <Box>
        <h1>1. Simple Counter</h1>
        <hr />
        <Flex>
          <button onClick={() => setCounter(counter + 1)}>+</button>
          <button onClick={() => setCounter(0)}>Reset</button>
          <span>
            Hasil <b>{counter}</b>
          </span>
        </Flex>
      </Box>

      <BoxCalculator>
        <h1>3. Calculator</h1>
        <hr />

        <h2>
          {calculatorInput} {result && `= ${result}`}
        </h2>
        <GridCalculator>
          {number.map((num, key) => (
            <button
              type="button"
              key={key}
              onClick={() => handleClick(num.toString())}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleClick("+")}
            disabled={
              !calculatorInput ||
              ["+", "-", "*", "/"].includes(calculatorInput.slice(-1))
            }
          >
            +
          </button>
          <button
            type="button"
            onClick={() => handleClick("-")}
            disabled={
              !calculatorInput ||
              ["+", "-", "*", "/"].includes(calculatorInput.slice(-1))
            }
          >
            -
          </button>
          <button
            type="button"
            onClick={() => handleClick("*")}
            disabled={
              !calculatorInput ||
              ["+", "-", "*", "/"].includes(calculatorInput.slice(-1))
            }
          >
            x
          </button>
          <button
            type="button"
            onClick={() => handleClick("/")}
            disabled={
              !calculatorInput ||
              ["+", "-", "*", "/"].includes(calculatorInput.slice(-1))
            }
          >
            :
          </button>
          <button
            type="button"
            onClick={() => {
              setCalculatorInput("");
              setresult("");
            }}
          >
            Clear
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "orange",
              color: "white",
              border: "none",
            }}
            onClick={() => handleCalculte()}
          >
            =
          </button>
        </GridCalculator>
      </BoxCalculator>

      <Box>
        <h1>4. Crawling</h1>
        <span style={{color:"red"}}>*saya menggunaka api gratis dari scrappingbee, kemungkinan hanya beberapa website yang bisa discrapping dan hanya bisa berlaku sampai tanggal 26 desember</span>
        <hr />
        <Flex>
          <input
            type="url"
            onChange={(e) => setLink(e.target.value)}
            placeholder="Masukkan Link Images"
            value={link}
          />
          <button onClick={() => crawlImagesFromUrl()}>Run</button>
          <button onClick={() => {setLink(""); setimageResult([])}}>Reset</button>
          <span>Hasil :</span>
        </Flex>

        {isLoading ? (
          <span>.....Loading</span>
        ) : (
          imageResult &&
          imageResult.map((item, index) => (
            <GridImages>
              <div className="image-container">
                <img src={item} alt={`images ${index}`} />
              </div>
            </GridImages>
          ))
        )}
      </Box>

      <Box>
        <h1>5. Current time</h1>
        <hr />
        <select
          style={{ width: "200px", height: "35px", marginTop: "10px" }}
          onChange={(e) => setSelectedZone(e.target.value)}
          value={selectedZone}
        >
          <option disabled value="">Pilih Time Zone</option>
          {timeZone.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <Flex>
          <button
            disabled={selectedZone === ""}
            style={{ width: "100px", height: "45px" }}
            onClick={() => CheckCurrentTimes()}
          >
            Cek Waktu
          </button>
          <h1>
            Hasil : {resultTime ? `${resultTime.date}: ${resultTime.time}` : ""}
          </h1>
        </Flex>
      </Box>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;
`;
const Box = styled.div`
  margin-top: 20px;
  border: 1px Solid;
  padding: 20px 25px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const BoxCalculator = styled.div`
  width: 350px;
  border: 1px Solid;
  padding-right: 50px;
  padding-left: 50px;
`;
const GridCalculator = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding-bottom: 20px;
  button {
    height: 45px;
    font-size: 1rem;
    border-radius: 8px;
  }
`;
const GridImages = styled.div`
   display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 16px; 
  padding: 16px;


  .image-container {
    position: relative;
    width: 200px;
    height: 180px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover; 
  }
`;
