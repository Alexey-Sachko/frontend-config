/*
Возвращает разметку приложения.
Ручная вставка bootstrap стилей, стилей проекта и скриптов применяется только для серверного рендеринга.
*/
module.exports = function () {
  return `
doctype html
html(lang="ru")
  head
    title App
  body
    div#root
`;
}
