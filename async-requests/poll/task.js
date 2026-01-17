document.addEventListener('DOMContentLoaded', () => {
  const pollTitle = document.getElementById('poll__title');
  const pollAnswers = document.getElementById('poll__answers');

  async function loadPoll() {
    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
      if (!response.ok) {
        throw new Error(`Ошибка загрузки опроса: ${response.statusText}`);
      }
      const data = await response.json();

      pollTitle.textContent = data.data.title;

      pollAnswers.innerHTML = '';

      data.data.answers.forEach((answerText, index) => {
        const button = document.createElement('button');
        button.className = 'poll__answer';
        button.textContent = answerText;
        button.addEventListener('click', () => handleVote(data.id, index));
        pollAnswers.appendChild(button);
      });
    } catch (error) {
      console.error('Не удалось загрузить опрос:', error);
      pollTitle.textContent = 'Ошибка загрузки опроса. Попробуйте позже.';
    }
  }

  async function handleVote(pollId, answerIndex) {
    const voteData = `vote=${pollId}&answer=${answerIndex}`;

    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: voteData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка отправки голоса: ${response.statusText}`);
      }

      const result = await response.json();
      alert('Спасибо, ваш голос засчитан!');

      showResults(result.stat);
    } catch (error) {
      console.error('Не удалось отправить голос:', error);
      alert('Произошла ошибка при отправке голоса. Попробуйте снова.');
    }
  }
  function showResults(stat) {
    pollAnswers.innerHTML = '<h3>Результаты голосования:</h3>';

    stat.forEach(item => {
      const resultLine = document.createElement('p');
      resultLine.textContent = `${item.answer}: ${item.votes} голосов`;
      pollAnswers.appendChild(resultLine);
    });
  }
  loadPoll();
});
