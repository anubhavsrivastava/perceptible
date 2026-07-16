import viewPortSpectator from './viewportSpectator';
import timeSpectator from './timeSpectator';
import elementSpectator from './elementSpectator';
import durationSpectator from './durationSpectator';
import { Spectator } from './spectatorManager';

/**
 * Returns default Spectator list
 *
 * @returns {Array<Spectator>} - Default Spectators to be used to detect the visibility
 */
const getDefaultSpectators = (): Array<Spectator> => {
	return [timeSpectator, elementSpectator, viewPortSpectator, durationSpectator];
};

export default getDefaultSpectators;
