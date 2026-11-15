import { useEffect, useRef, useState } from "react";

const notes = [
  "Я тут заметил одну вещь... Кое-кто стал слишком часто попадаться мне на глаза.",
  "С тобой почему-то проще разговаривать, чем со многими. Даже когда я не придумал, что сказать.",
  "Иногда вижу твоё сообщение и отвечаю быстрее, чем собирался. Не знаю, зачем я сейчас это выдал.",
  "Ты подозрительно хорошо умеешь улучшать мне настроение. Надо будет выяснить, как у тебя это получается.",
  "Кажется, мне стало важно, что ты обо мне думаешь. Немного неловко это признавать.",
  "Если мы долго не общаемся, мне чего-то не хватает. Скорее всего, именно тебя, но я ещё провожу расследование.",
  "В общем, один человек мне нравится всё больше. Думаю, ты уже догадалась, кто это.",
];

const balloons = [
  { left: 7, size: 72, duration: 16, delay: -4, color: "#fa6f8f", sway: 24 },
  { left: 24, size: 88, duration: 20, delay: -13, color: "#ff967d", sway: -20 },
  { left: 43, size: 76, duration: 17, delay: -8, color: "#d94264", sway: 30 },
  { left: 62, size: 96, duration: 22, delay: -17, color: "#f47e99", sway: -28 },
  { left: 80, size: 78, duration: 18, delay: -2, color: "#ffad91", sway: 22 },
  { left: 16, size: 82, duration: 21, delay: -18, color: "#e85572", sway: -26 },
  { left: 72, size: 90, duration: 19, delay: -10, color: "#f28595", sway: 28 },
];

function BearSticker() {
  return (
    <svg className="bear" viewBox="0 0 180 160" role="img" aria-label="Мишка держит сердечко">
      <g className="bear-body">
        <circle cx="47" cy="42" r="24" fill="#C99168" />
        <circle cx="133" cy="42" r="24" fill="#C99168" />
        <circle cx="47" cy="42" r="13" fill="#EAB88E" />
        <circle cx="133" cy="42" r="13" fill="#EAB88E" />
        <path
          d="M37 79c0-37 23-59 53-59s53 22 53 59c0 23-11 38-23 47H60c-13-9-23-24-23-47Z"
          fill="#DCA477"
        />
        <ellipse cx="90" cy="82" rx="29" ry="25" fill="#F3CFAC" />
        <circle cx="70" cy="66" r="4.5" fill="#432F2B" className="bear-eye left-eye" />
        <circle cx="110" cy="66" r="4.5" fill="#432F2B" className="bear-eye" />
        <ellipse cx="90" cy="78" rx="7" ry="5.5" fill="#432F2B" />
        <path
          d="M90 83c0 8-10 9-13 3M90 83c0 8 10 9 13 3"
          fill="none"
          stroke="#432F2B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="59" cy="83" rx="9" ry="5" fill="#E98883" opacity=".65" />
        <ellipse cx="121" cy="83" rx="9" ry="5" fill="#E98883" opacity=".65" />
        <path
          d="M31 128c6-24 19-33 31-25l28 21 28-21c12-8 25 1 31 25-12 15-29 23-59 23s-47-8-59-23Z"
          fill="#C99168"
        />
        <path
          d="M90 147c-5-5-34-25-34-45 0-12 9-20 20-20 7 0 12 4 14 9 3-5 8-9 15-9 11 0 20 8 20 20 0 20-30 40-35 45Z"
          fill="#F35472"
        />
        <path
          d="M69 104c2-7 8-10 15-8"
          fill="none"
          stroke="#FF9AAF"
          strokeWidth="5"
          strokeLinecap="round"
          opacity=".8"
        />
      </g>
    </svg>
  );
}

function App() {
  const [caught, setCaught] = useState([]);
  const [bursting, setBursting] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [goldReady, setGoldReady] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [runaway, setRunaway] = useState({ x: 0, y: 0 });
  const finalCard = useRef(null);

  const catchBalloon = (index) => {
    if (caught.includes(index) || bursting.includes(index)) return;
    setBursting((current) => [...current, index]);
    window.setTimeout(() => {
      setCaught((current) => [...current, index]);
      setBursting((current) => current.filter((id) => id !== index));
      setActiveNote(index);
    }, 280);
  };

  const closeNote = () => {
    const willComplete = caught.length === notes.length;
    setActiveNote(null);
    if (willComplete && !goldReady) {
      window.setTimeout(() => setGoldReady(true), 1000);
    }
  };

  const moveRunaway = (event) => {
    event.preventDefault();
    const card = finalCard.current;
    if (!card) return;
    const maxX = Math.max(36, Math.min(card.clientWidth / 2 - 62, 125));
    const maxY = 46;
    let x = (Math.random() * 2 - 1) * maxX;
    let y = (Math.random() * 2 - 1) * maxY;
    if (Math.abs(x - runaway.x) < 45) x = x > 0 ? -maxX : maxX;
    setRunaway({ x, y });
  };

  useEffect(() => {
    document.title = "Для Дениз";
  }, []);

  return (
    <main className="surprise">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <p className="eyebrow">Маленький сюрприз</p>
        <div className="counter" aria-live="polite">
          <span>{caught.length}</span>
          <span className="counter-divider">из</span>
          <span>7</span>
        </div>
      </header>

      <section className="intro" aria-label="Для Дениз">
        <p className="intro-kicker">Для Дениз</p>
        <h1>
          {caught.length < 7
            ? "Поймай все сердечки"
            : goldReady
              ? "Осталось одно"
              : "Кажется, это всё..."}
        </h1>
        <p className="intro-copy">
          {caught.length < 7
            ? "В каждом спряталась небольшая записка"
            : goldReady
              ? "И оно немного особенное"
              : "Подожди буквально секунду"}
        </p>
      </section>

      <div className="balloon-field" aria-label="Летающие шарики">
        {balloons.map((balloon, index) => {
          const isCaught = caught.includes(index);
          const isBursting = bursting.includes(index);
          if (isCaught) return null;
          return (
            <button
              className={`balloon-flight ${isBursting ? "is-bursting" : ""}`}
              key={index}
              onClick={() => catchBalloon(index)}
              aria-label={`Поймать сердечко ${index + 1}`}
              style={{
                "--left": `${balloon.left}%`,
                "--size": `${balloon.size}px`,
                "--duration": `${balloon.duration}s`,
                "--delay": `${balloon.delay}s`,
                "--color": balloon.color,
                "--sway": `${balloon.sway}px`,
              }}
            >
              <span className="heart-balloon">
                <span className="shine" />
              </span>
              <span className="balloon-knot" />
              <span className="string" />
              {isBursting && (
                <span className="burst" aria-hidden="true">
                  {Array.from({ length: 10 }, (_, spark) => (
                    <i key={spark} style={{ "--angle": `${spark * 36}deg` }} />
                  ))}
                </span>
              )}
            </button>
          );
        })}

        {goldReady && !finalOpen && (
          <button
            className="gold-flight"
            onClick={() => setFinalOpen(true)}
            aria-label="Поймать золотое сердечко"
          >
            <span className="gold-aura" />
            <span className="heart-balloon gold-heart">
              <span className="gold-symbol">♥</span>
            </span>
            <span className="balloon-knot gold-knot" />
            <span className="string gold-string" />
            {Array.from({ length: 8 }, (_, index) => (
              <i className={`gold-spark spark-${index + 1}`} key={index} />
            ))}
          </button>
        )}
      </div>

      <p className="hint">
        {caught.length < 7 ? "Нажимай на шарики" : !goldReady ? "Секундочку..." : "Лови его"}
      </p>
      <footer>От Эмина</footer>

      {activeNote !== null && (
        <div
          className="note-overlay"
          onClick={closeNote}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && closeNote()}
        >
          <div className="note-card">
            <div className="note-number">записка {activeNote + 1}</div>
            <p>{notes[activeNote]}</p>
            <span className="tap-away">Нажми в любом месте</span>
          </div>
        </div>
      )}

      {finalOpen && (
        <div className="final-overlay">
          <div className="petals" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <i key={index} style={{ "--i": index }} />
            ))}
          </div>
          <div className="final-card" ref={finalCard}>
            <div className="final-small">Ну вот, теперь честно</div>
            <h2>{answer ? "Я так и надеялся" : "Ты мне нравишься"}</h2>
            <BearSticker />
            <p className="final-copy">
              {answer
                ? "Теперь я улыбаюсь. И, кажется, довольно глупо."
                : "Без громких слов. Просто давно хотел тебе это сказать."}
            </p>
            {!answer && (
              <div className="answers">
                <button className="yes-button" onClick={() => setAnswer(true)}>
                  Да
                </button>
                <button
                  className="maybe-button"
                  onPointerEnter={moveRunaway}
                  onPointerDown={moveRunaway}
                  style={{ transform: `translate(${runaway.x}px, ${runaway.y}px)` }}
                >
                  Подумаю
                </button>
              </div>
            )}
            <div className="signature">От Эмина</div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
