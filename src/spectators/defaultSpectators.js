import viewPortSpectator from './viewportSpectator';
import timeSpectator from './timeSpectator';
import elementSpectator from './elementSpectator';
import durationSpectator from './durationSpectator';

/**
 * Returns default Spectator list
 *
 * @returns {list<function>} - Default SPectators to be used to detect the visibility
 */
const getDefaultSpectators = () => {
	return [timeSpectator, elementSpectator, viewPortSpectator, durationSpectator];
};

export default getDefaultSpectators;
