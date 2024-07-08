/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';

import { ExplorerIconProps } from '../../types/icons.types';

export const ExplorerIconPlaceholder: React.FC<ExplorerIconProps> = () => {
  // This component should not be rendered unless the user has misconfigured Explorer
  const title =
    'No icon component found. Please follow Explorer installation instructions to ' +
    'provide a pre-made icon component (or a custom icon).';
  return <span title={title}>⚠️</span>;
};
