const d = document;

export default function createElementsForButton(id) {
	let soundIcon = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-volume-up-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
      />
      <path
        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
      />
      <path
        d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
      />
    </svg>`,
		startIcon = `
    <svg role="img" height="15" width="15" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" class="start">
      <path
        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
      ></path>
    </svg>`;

	const $div = d.createElement("div"),
		$input = d.createElement("input"),
		$button1 = d.createElement("button"),
		$button2 = d.createElement("button");

	$button1.classList.add("player-button");
	$button1.innerHTML = startIcon;
	$button1.dataset.id = id;
	$input.type = "range";
	$input.classList.add("timeline");
	$input.max = "100";
	$input.value = "0";
	$button2.classList.add("sound-button");
	$button2.innerHTML = soundIcon;

	$div.appendChild($button1);
	$div.appendChild($input);
	$div.appendChild($button2);

	return $div;
}
