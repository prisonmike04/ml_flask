import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import img1 from './ml_202.svg';
import './App.css';
function App() {
  const shakeAnimation = {
    hover: {
      rotate: [-10, 10, -10],
      transition: { duration: 1.3, repeat: Infinity },
    },
  };
  const [cancer, setcancer] = useState({
    Peer: '',
    alcohol: '',
    anxiety: '',
    chronic: '',
  });
  const [all, setall] = useState([]);

  const handle1 = (e) => {
    setcancer({ ...cancer, Peer: e.target.value });
  };
  const handle2 = (e) => {
    setcancer({ ...cancer, alcohol: e.target.value });
  };
  const handle3 = (e) => {
    setcancer({ ...cancer, anxiety: e.target.value });
  };
  const handle4 = (e) => {
    setcancer({ ...cancer, chronic: e.target.value });
  };

  const sendAll = async () => {
    try {
      console.log('Data sent:', { cancer });
      const response = await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cancer }),
      });
      const datah = await response.json();
      console.log(datah.prediction[0]);
      setall(datah.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-row h-auto w-screen p1">
        <div className="flex justify-center items-center w-[80vw] ">
          <img src={img1} height="800px" width="400px" />
        </div>
        <div className="flex flex-col h-auto w-screen justify-center items-center gap-3">
          <motion.div>
            <h1 className="text-white title font-bold command">
              PREDICTION <span className="specify">(NO=0, YES=1)</span>
            </h1>
          </motion.div>
          <div className="flex-row justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div>
                <label className="text-2xl font-bold">Smoking</label>
              </div>
              <div>
                <input type="number" onChange={handle1} placeholder="1 or 0" />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div>
                <label className="text-2xl font-bold">
                  Alcohol Consumption
                </label>
              </div>
              <div>
                <input type="number" onChange={handle2} placeholder="1 or 0" />
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div>
                <label className="text-2xl font-bold">Anxiety</label>
              </div>
              <div>
                <input type="number" onChange={handle3} placeholder="1 or 0" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <label className="text-2xl font-bold">Chronic Disease</label>
              </div>
              <div>
                <input type="number" onChange={handle4} placeholder="1 or 0" />
              </div>
            </div>
          </div>
          <motion.div whileTap={{ scale: [1, 1.5, 5] }}>
            {/* <button
              onClick={sendAll}
              className=" font-bold text-black bg-yellow-200 p-4 w-full border-spacing-1 rounded-3xl mb-4"
            >
              Submit
            </button> */}
            <button class="button" onClick={sendAll}>
              <span>SUBMIT</span>
            </button>
          </motion.div>
          <div className="ans text-black-300 font-extrabold text-4xl">
            {all.map((p, item) => {
              return (
                <div>
                  {p && p == 1 ? (
                    <div className="command">
                      <h3 key={item}>Lung Cancer is predicted</h3>
                    </div>
                  ) : (
                    <div className="conc">
                      <h3>You are Safe !!!!</h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
