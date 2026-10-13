// 응원 문장은 이 파일에만 있습니다. 화면(index.html)에는 넣지 않습니다.
const MESSAGES = [
  "오늘도 충분히 잘하고 있어요.",
  "천천히 가도 괜찮아요. 멈추지만 않으면 돼요.",
  "어제보다 한 걸음 더 나아간 오늘을 응원해요.",
  "지금의 노력은 반드시 좋은 결과로 돌아올 거예요.",
  "힘든 하루였다면, 버텨 낸 것만으로도 대단해요.",
  "당신의 속도가 가장 알맞은 속도예요.",
  "작은 시작이 큰 변화를 만들어요. 오늘도 파이팅!",
  "실수해도 괜찮아요. 그만큼 배우고 있다는 뜻이에요.",
  "오늘 하루도 스스로를 칭찬해 주세요.",
  "잘하고 있으니 걱정은 조금 내려놓아도 돼요.",
  "쉬어 가는 것도 앞으로 나아가는 방법이에요.",
  "할 수 있어요. 이미 여기까지 왔잖아요.",
  "오늘의 작은 웃음이 내일의 큰 힘이 될 거예요.",
  "누군가는 당신 덕분에 오늘 힘을 얻었을 거예요.",
  "좋은 일은 생각보다 가까이에 와 있어요.",
];

const DEFAULT_NAME = "여러분";
const MAX_NAME_LENGTH = 20;

function readName(req) {
  const url = new URL(req.url, "http://localhost");
  const raw = (url.searchParams.get("name") || "").trim();
  // 이모지 등이 중간에 잘리지 않도록 글자 단위로 자릅니다.
  return Array.from(raw).slice(0, MAX_NAME_LENGTH).join("");
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return send(res, 405, { error: "GET 요청만 받을 수 있어요." });
  }

  const name = readName(req);
  const picked = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  const greeting = name ? `${name}님, ` : `${DEFAULT_NAME}, `;

  send(res, 200, {
    name: name || DEFAULT_NAME,
    message: greeting + picked,
  });
};
