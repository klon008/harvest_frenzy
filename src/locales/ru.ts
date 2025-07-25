export const ru = {
    title: 'Безумный урожай',
    subtitle: 'Нажимайте на кусты, чтобы собрать урожай и набрать максимум очков!',
    play_again: 'Играть снова',
    total_score: 'Общий счет',
    plot: 'Грядка',
    game_over_title: 'Игра окончена!',
    game_over_subtitle: 'Вы собрали {totalScore} фруктов!',
    bonus_triggered: 'Сработал шанс бонуса для кустов не {color} цвета!',

    // AI Assistant
    prompt_generator_title: 'Генератор промптов',
    generate_prompt_button: 'Сгенерировать промпт',
    copy_button: 'Копировать',
    prompt_generator_desc: 'Нажмите "Сгенерировать промпт", чтобы создать подробный запрос для вашего любимого ИИ на основе текущего состояния игры.',
    toast_copied_title: 'Скопировано!',
    toast_copied_desc: 'Промпт скопирован в буфер обмена.',

    // Game Log
    game_log_title: 'Лог игры',
    game_log_empty: 'Пока нет действий. Начните собирать урожай!',

    // Log Messages
    log_new_game: 'Новая игра началась!',
    log_game_over: 'Игра окончена! Итоговый счет: {totalScore}',
    log_harvest: 'Собран {color} куст на грядке {plot}, получено {points} очков.',
    log_neighbor_survived: 'Соседний куст на грядке {plot} выжил!',
    log_neighbor_doubled: 'Ценность соседнего куста на грядке {plot} удвоилась до x{multiplier}!',
    log_neighbor_withered: 'Соседний куст на грядке {plot} увял.',
    log_bonus_applied: 'x2 бонус для {color} куста на грядке {plot}!',
    log_bonus_triggered: 'Сработал шанс бонуса для кустов не {color} цвета!',

    // Prompt Template
    prompt_template: `Вы — ассистент по сбору урожая, эксперт в максимизации очков в игре "Безумный урожай".

Учитывая текущее состояние грядок, историю игры и правила, проанализируйте ситуацию и дайте рекомендацию по следующему лучшему кусту для сбора. Объясните свои рассуждения, учитывая вероятности срабатывания бонусов, эффекты соседних кустов и потенциал для максимизации общего урожая.

Текущее состояние игры:
Грядки:
{plotsState}
Текущий счет: {currentScore}

История игры (от старых к новым):
{logsHistory}

Правила игры:
- На каждой грядке есть два куста, которые могут быть синего, фиолетового или желтого цвета.
- Нажатие на куст приносит 100 очков соответствующего цвета, и куст увядает.
- Существует 60% шанс, что соседний куст на той же грядке не увянет.
- При нажатии на куст, КАЖДЫЙ другой куст на ВСЕХ грядках (включая выжившего соседа) другого цвета имеет 50% шанс получить бонусный множитель x2 для последующих сборов. Этот бонус также может складываться (например, x2, x4 и т.д.).

Исходя из этого, какова ваша рекомендация для следующего сбора?`,
};
