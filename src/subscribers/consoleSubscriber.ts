import Perceptor, { SpectatorResult } from '../index';

/**
 * Logs SpectatorResult on console.
 * @param {Perceptor} _perceptorInstance
 * @param {SpectatorResult} context
 */
export default function consoleSubscriber(_perceptorInstance: Perceptor, context: SpectatorResult): void { // eslint-disable-line @typescript-eslint/no-unused-vars
	console.log(context); //eslint-disable-line
}
