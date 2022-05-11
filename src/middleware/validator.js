const regEmail =
  /^[0-9a-zA-Z-_]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
const regPhone = /^[0-9]{11,11}$/;
const regName = /^[ㄱ-ㅎ|가-힣]{2,5}$/;

export function signValidator(req, res, next) {
  // eslint-disable-next-line prefer-destructuring
  const { name, nickName, password, email, phone } = req.body;
  if (!name || !nickName || !password || !email || !phone) {
    return res.status(400).json({
      error: {
        message: '회원가입 형식이 올바르지 않습니다.',
      },
    });
  }
  if (!regEmail.test(email) && email.length > 30) {
    return res.status(400).json({
      error: {
        message: '이메일 형식이 올바르지 않습니다.',
      },
    });
  }
  // 8~20자리 이내, 비밀번호는 공백 없이, 영문,숫자,특수문자 혼합
  // TODO: 각각의 케이스에 대해 에러메세지를 추가해야 함
  if (!regPassword.test(password)) {
    return res.status(400).json({
      error: {
        message: '비밀번호는 공백 없이, 영문,숫자,특수문자 혼합한 8~20자로 입력해주세요',
      },
    });
  }
  // 숫자로만 이루어져있는지 11글자인지
  if (!regPhone.test(phone)) {
    return res.status(400).json({
      error: {
        message: 'phone는 -를 제외한 11자를 입력해주세요.',
      },
    });
  }
  if (!regName.test(name)) {
    return res.status(400).json({
      error: {
        message: 'name은 한글로 5글자 이하를 입력해주세요.',
      },
    });
  }
  if (nickName.length > 10) {
    return res.status(400).json({
      error: {
        message: 'nickName는 10자이하를 입력해주세요.',
      },
    });
  }
  return next();
}

export function loginValidator(req, res, next) {
  // eslint-disable-next-line
  const { nickName, password } = req.body;
  if (!nickName) {
    return res.json({
      error: {
        message: '아이디를 입력해주세요',
      },
    });
  }
  if (!regPassword.test(password)) {
    return res.status(400).json({
      error: {
        message: '비밀번호는 공백 없이, 영문,숫자,특수문자 혼합한 8~20자로 입력해주세요',
      },
    });
  }
  return next();
}

export function sendMailValidator(req, res, next) {
  // eslint-disable-next-line prefer-destructuring
  const { professor_email, text, subject } = req.body;
  if (!regEmail.test(professor_email) && professor_email.length > 30) {
    return res.status(400).json({
      error: {
        message: '이메일 형식이 올바르지 않습니다.',
      },
    });
  }
  if (!text) {
    return res.status(400).json({
      error: {
        message: '내용을 입력해주세요',
      },
    });
  }
  if (!subject) {
    return res.status(400).json({
      error: {
        message: '제목을 입력해주세요',
      },
    });
  }
  return next();
}
