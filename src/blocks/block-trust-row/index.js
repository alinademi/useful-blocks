import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor';

import {
  PanelBody,
  HorizontalRule,
  RangeControl,
  ToggleControl,
} from '@wordpress/components';


const ALLOWED_BLOCKS = ['tblocks/trust-column'];

registerBlockType('tblocks/trust-row', {
  title: __('Row Block'),

  description: __('Provides custom container for columns.'),

  keywords: [__('row'), __('columns'), __('col'), __('cols'), __('grid')],

  supports: {
    anchor: true,
    html: true,
    className: false,
  },

  apiVersion: 2,

  category: 'tblocks',

  icon: 'schedule',

  // variations:VARIATIONS,

  attributes: {
    columnsCount: {
      type: 'number',
      default: 1,
    },
    twoColumnsMobile: {
      type: 'boolean',
      default: '',
    },
    number: {
      type: 'number',
      default: '',
    },
    showHideBorder: {
      type: 'boolean',
    },
  },

  edit: (props) => {
    const {
      attributes: { columnsCount, twoColumnsMobile, showHideBorder },
      setAttributes,
    } = props;

    const onColumnsCount = (newColumnsCount) => {
      setAttributes({ columnsCount: newColumnsCount });
    };

    const onTwoColumnsMobile = (newTwoColumnsMobile) => {
      setAttributes({ twoColumnsMobile: newTwoColumnsMobile });
    };

    const onShowHideBorder = (newShowHideBorder) => {
      setAttributes({ showHideBorder: newShowHideBorder });
    };

    const CLASSES = `trust-row has-${columnsCount}-col ${
      twoColumnsMobile && `has-forced-2-col-sm`
    } ${showHideBorder && `with-border`}`;

    const blockProps = useBlockProps({
      className: CLASSES,
    });

    return [
      <InspectorControls>
        <PanelBody
          title='Trust Row Settings'
          icon='admin-generic'
          initialOpen={true}
          className='trust-block__side-panel-body'
        >
          <RangeControl
            label={__('Number Of Columns', 'tblocks')}
            value={columnsCount}
            onChange={onColumnsCount}
            min={1}
            max={4}
          />

          <HorizontalRule />

          <ToggleControl
            label='Add Border'
            checked={showHideBorder}
            onChange={onShowHideBorder}
          />

          <HorizontalRule />

          <ToggleControl
            label='Force 2 columns on Mobile'
            checked={twoColumnsMobile}
            onChange={onTwoColumnsMobile}
          />
        </PanelBody>
      </InspectorControls>,

      <section {...blockProps}>
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          // renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
        />
      </section>,
    ];
  },

  save: (props) => {
    const {
      attributes: { columnsCount, twoColumnsMobile, showHideBorder },
    } = props;

    const CLASSES = `trust-row has-${columnsCount}-col ${
      twoColumnsMobile && `has-forced-2-col-sm`
    } ${showHideBorder && `with-border`}`;

    const blockProps = useBlockProps.save({
      className: CLASSES,
    });

    return (
      <section {...blockProps}>
        <InnerBlocks.Content />
      </section>
    );
  },
});
