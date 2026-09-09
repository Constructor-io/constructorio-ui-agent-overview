import type { Translations } from '@src/types';
import translate from '@src/utils/translate';

import ErrorIconSVG from '../icons/ErrorIconSVG';

import './ErrorMessage.css';

interface IErrorMessageProps {
  /** Translation overrides for UI strings. */
  translations?: Translations;
}

export default function ErrorMessage({ translations }: IErrorMessageProps) {
  return (
    <div className="cio-agent-overview-error">
      <div className="cio-agent-overview-error-icon" aria-hidden="true">
        <ErrorIconSVG />
      </div>
      <p className="cio-agent-overview-error-message" role="alert">
        {translate('CioAgentOverview.error.message', translations)}
      </p>
    </div>
  );
}
