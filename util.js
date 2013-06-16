function random (x, y) {
	return x + Math.random() * (y - x);
}

function interpolate(i, fromIdx, toIdx, min, max) {
	var pct = (i - fromIdx) / (toIdx - fromIdx);
	return min + pct * (max - min);
}