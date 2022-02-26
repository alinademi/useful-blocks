/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
  useBlockProps,
  InnerBlocks,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';

import {
  PanelBody,
  TextControl,
} from '@wordpress/components';

registerBlockType('tblocks/block-show-hide', {
  title: __('Show / Hide'),

  description: __('Provides a custom show/hide block.'),

  keywords: [__('accordion'), __('show'), __('hide')],

  supports: {
    anchor: true,
    html: true,
    className: false,
  },

  apiVersion: 2,

  category: 'tblocks',

  icon: 'visibility',

  attributes: {
    accordionTitle: {
      type: 'string',
      source: 'html',
      selector: '.trust-show-hide__title',
    },
    content: {
      type: 'string',
    },
    collapseMessage: {
      type: 'string',
    },
    openMessage: {
      type: 'string',
    },
  },

  edit: (props) => {
    const {
      attributes: { accordionTitle, collapseMessage, openMessage },
      className,
      setAttributes,
    } = props;

    const setCollapseMessage = (newCollapseMessage) => {
      setAttributes({ collapseMessage: newCollapseMessage });
    };
    const setOpenMessage = (newOpenMessage) => {
      setAttributes({ openMessage: newOpenMessage });
    };

    const CLASSES = `trust-show-hide bg-lightgrey`;

    const blockProps = useBlockProps({
      className: CLASSES,
    });

    const onChangeAccordionTitle = (newAccordionTitle) => {
      setAttributes({ accordionTitle: newAccordionTitle });
    };
    return [
      <InspectorControls>
        <PanelBody
          title='Trust Show / Hide Settings'
          initialOpen={true}
          className='trust-block__side-panel-body'
        >
          <TextControl
            label='User Message Closed'
            value={collapseMessage}
            onChange={setCollapseMessage}
            type='text'
            placeholder='Example: Click Here'
          />
          <TextControl
            label='User Message Open'
            value={openMessage}
            onChange={setOpenMessage}
            type='text'
            placeholder='Example: close'
          />
        </PanelBody>
      </InspectorControls>,

      <details {...blockProps} id='trust-showHide'>
        <summary>
          <RichText
            placeholder={__(
              'Add title here then open accordion to add other blocks',
              'tblocks'
            )}
            value={accordionTitle}
            onChange={onChangeAccordionTitle}
            className={`trust-show-hide__title ${
              collapseMessage ? `with-callapse-message` : ''
            } ${openMessage ? `with-open-message` : ''}`}
            data-collapse-message={`${collapseMessage ? collapseMessage : ''}`}
            data-open-message={`${openMessage ? openMessage : ''}`}
          />
        </summary>
        <div className='trust-show-hide__content'>
          <InnerBlocks />
        </div>
      </details>,
    ];
  },

  save: (props) => {
    const {
      attributes: { accordionTitle, collapseMessage, openMessage },
    } = props;

    const CLASSES = `trust-show-hide `;

    const blockProps = useBlockProps.save({
      className: CLASSES,
    });

    return (
      <details {...blockProps} id='trust-showHide'>
        <summary>
          <h3
            className='trust-show-hide__title'
            data-collapse-message={`${
              collapseMessage && `[ ${collapseMessage} ]`
            }`}
            data-open-message={`${openMessage ? openMessage : ''}`}
          >
            <RichText.Content
              value={accordionTitle}
              className={`trust-show-hide__title ${
                collapseMessage ? `with-callapse-message` : ''
              } ${openMessage ? `with-open-message` : ''}`}
            />
          </h3>
        </summary>
        <div className='trust-show-hide__content'>
          <InnerBlocks.Content />
        </div>
      </details>
    );
  },
});
