import SpectatorManager from './spectatorManager';
import viewPortSpectator from './viewportSpectator';
import timeSpectator from './timeSpectator';

const getDefaultSpectators = () => {
	const defaultSpectator = new SpectatorManager();
	defaultSpectator.use(timeSpectator);

	defaultSpectator.use(viewPortSpectator);

	return defaultSpectator;
};

export default getDefaultSpectators;
export { viewPortSpectator, getDefaultSpectators };
