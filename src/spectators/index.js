import SpectatorManager from './spectatorManager';
import viewPortSpectator from './viewportSpectator';

const getDefaultSpectators = () => {
	const defaultSpectator = new SpectatorManager();
	defaultSpectator.use(viewPortSpectator);
	return defaultSpectator;
};

export default getDefaultSpectators;
export { viewPortSpectator, getDefaultSpectators };
