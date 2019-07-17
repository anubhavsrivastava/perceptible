import SpectatorManager from './spectatorManager';
import viewPortSpectator from './viewportSpectator';
import timeSpectator from './timeSpectator';
import elementSpectator from './elementSpectator';
import durationSpectator from './durationSpectator';

const getDefaultSpectators = () => {
	const defaultSpectator = new SpectatorManager();
	defaultSpectator.use(timeSpectator);
	defaultSpectator.use(elementSpectator);
	defaultSpectator.use(viewPortSpectator);
	defaultSpectator.use(durationSpectator);
	return defaultSpectator;
};

export default getDefaultSpectators;
export { viewPortSpectator, getDefaultSpectators };
