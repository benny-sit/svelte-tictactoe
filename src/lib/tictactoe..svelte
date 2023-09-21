<script>
	import { transpose, getDiagonals } from '../utils/arrays';

	export let boardSize = 3;
	let state = 'start';
	let winner = '';

	$: playable = state === 'x' || state === 'o';
	$: board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));

	function resetGame() {
		board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
		state = 'x';
		winner = '';
	}

	function flipState() {
		state = (state === 'x' && 'o') || 'x';
	}

	function handleMove(i, j) {
		if (board[i][j]) return;

		board[i][j] = state;
		flipState();

		checkWinner();
	}

	function checkWinner() {
		if (board.flat().every((v) => !!v)) {
			state = 'reset';
			return;
		}

		checkRows(board);
		checkRows(transpose(board));
		checkRows(getDiagonals(board));
	}

	function checkRows(a) {
		a.map((r) => {
			if (r[0] && r.every((c) => c === r[0])) {
				state = 'reset';
				winner = r[0];
			}
		});
	}
</script>

<section class="mx-auto max-w-xl w-full grid grid-cols-3 gap-3 relative">
	{#each board as row, i}
		{#each row as column, j}
			<button
				disabled={!playable}
				on:click={() => handleMove(i, j)}
				class="grid place-items-center aspect-square bg-slate-100"
			>
				{#if column === 'x'}
					<div
						class="w-full relative bg-slate-800 h-4 before:absolute before:inset-0 before:bg-inherit before:rotate-90 rotate-45"
					/>
				{:else if column === 'o'}
					<div
						class="w-[calc((140/180)*100%)] border-[16px] border-slate-800 rounded-full aspect-square"
					/>
				{/if}
			</button>
		{/each}
	{/each}

	{#if !playable}
		<div
			class="bg-slate-700/50 absolute inset-3 grid place-items-center place-content-center gap-3"
		>
			{#if state === 'reset'}
				<div class="text-white font-semibold text-2xl">
					{#if winner}The Winner is {winner.toUpperCase()}!{:else}Draw{/if}
				</div>
			{/if}
			<button on:click={resetGame} class="bg-blue-600 text-white px-4 py-2 capitalize">{state}</button>
		</div>
	{/if}
</section>
