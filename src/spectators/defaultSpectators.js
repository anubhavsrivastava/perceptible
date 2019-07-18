import viewPortSpectator from './viewportSpectator';
import timeSpectator from './timeSpectator';
import elementSpectator from './elementSpectator';
import durationSpectator from './durationSpectator';

const getDefaultSpectators = () => {
	return [timeSpectator, elementSpectator, viewPortSpectator, durationSpectator];
};

export default getDefaultSpectators;
