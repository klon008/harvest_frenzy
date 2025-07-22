export const en = {
    title: 'Harvest Frenzy',
    subtitle: 'Click the bushes to harvest and maximize your score!',
    play_again: 'Play Again',
    total_score: 'Total Score',
    plot: 'Plot',
    game_over_title: 'Game Over!',
    game_over_subtitle: 'You harvested a total of {totalScore} fruits!',
    bonus_triggered: 'Bonus chance triggered for non-{color} bushes!',
    
    // AI Assistant
    prompt_generator_title: 'Prompt Generator',
    generate_prompt_button: 'Generate Prompt',
    copy_button: 'Copy',
    prompt_generator_desc: 'Click "Generate Prompt" to create a detailed prompt for your favorite AI, based on the current game state.',
    toast_copied_title: 'Copied!',
    toast_copied_desc: 'Prompt copied to clipboard.',

    // Game Log
    game_log_title: 'Game Log',
    game_log_empty: 'No actions yet. Start harvesting!',

    // Log Messages
    log_new_game: 'New game started!',
    log_game_over: 'Game Over! Final Score: {totalScore}',
    log_harvest: 'Harvested {color} bush on Plot {plot} for {points} points.',
    log_neighbor_survived: 'Neighbor bush on Plot {plot} survived!',
    log_neighbor_doubled: 'Neighbor bush on Plot {plot} value doubled to x{multiplier}!',
    log_neighbor_withered: 'Neighbor bush on Plot {plot} withered.',
    log_bonus_applied: 'x2 bonus for {color} bush on Plot {plot}!',
    log_bonus_triggered: 'Bonus chance triggered for non-{color} bushes!',

    // Prompt Template
    prompt_template: `You are a harvest assistant, expert in maximizing scores in the Harvest Frenzy game.

Given the current state of the garden plots, game history, and the game rules, analyze the situation and provide a recommendation for the next best bush to harvest. Explain your reasoning, considering the probabilities of bonus triggers, neighboring bush effects, and the potential for maximizing the harvest total.

Here's the current game state:
Plots:
{plotsState}
Current Score: {currentScore}

Game History (from oldest to newest):
{logsHistory}

Game Rules:
- Each plot has two bushes that can be blue, purple, or yellow.
- Clicking a bush yields 100 points of the corresponding color, and the bush withers.
- There is a 60% chance the neighboring bush on that plot does not wither.
- If the neighbor survives and is a different color, there is a 50% chance its value will be doubled (stackable, e.g., x2, x4, etc.).
- When a bush is clicked, EACH other bush on ALL plots of a different color has a 50% chance to get a x2 bonus multiplier for subsequent harvests. This bonus can also stack.

Based on this, what is your recommendation for the next harvest?`,
};
