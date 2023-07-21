import {
  ControllerValidateResult,
  Rule,
  ValidationController,
} from "aurelia-validation";

import _ from "lodash";

/**
 * Some regex pattern for validation
 */
export const isInteger = /^[0-9]*$/;
export const isNumber = /^[0-9]+(?:\.[0-9]+)?$/;
export const isAmount = /^[0-9]{1,3}('[0-9]{3})*$/; // Matches amounts, separated by comma, e.g. 12'555'432
export const amount = /\B(?=(\d{3})+(?!\d))/g; // Format a string of numbers to separate thousands, e.g. 10'000
export const urlString = /^https?:\/\//; // Matches urls
export const protocol = /.*:\/\/.*/; // Matches any string which contains ://

/**
 * Checks if something is empty or satisfies a function
 */
export const isEmptyOrSatisfies = (
  value: any,
  satisfies: (value: any) => boolean
): boolean => {
  if (
    !value ||
    _.isEmpty(value) ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true;
  }

  return satisfies(value);
};

export const validateURL = (value: string): boolean => {
  return urlString.test(value);
};

export const validateProtocol = (value: string): boolean => {
  return protocol.test(value);
};

export const validatedField = <M, T>(
  rules: Rule<M, any>[][],
  model: T,
  controller: ValidationController,
  fieldName: string
): Promise<ControllerValidateResult[]> => {
  const promises: Promise<ControllerValidateResult>[] = [];

  rules.forEach((rulesItem) =>
    rulesItem.forEach((rule) => {
      if (fieldName === rule.property.name) {
        const result = controller.validate({
          object: model,
          propertyName: rule.property.name,
        });

        promises.push(result);
      }
    })
  );

  return Promise.all(promises);
};

export const isControllerValidByRules = <T>(
  rules: Rule<T, any>[][],
  model: T,
  controller: ValidationController
): boolean => {
  return (
    !controller.validating &&
    controller[`results`].length >= countApplicableRules<T>(rules, model) &&
    controller.errors.length === 0
  );
};

/**
 * Count the applicable rules for an object
 */
const countApplicableRules = <T>(
  rules: Rule<T, any>[][],
  object: T
): number => {
  return (
    rules &&
    rules.reduce(
      (total, rules) =>
        rules.reduce(
          (acc, rule) => acc + (!rule.when || rule.when(object) ? 1 : 0),
          total
        ),
      0
    )
  );
};
