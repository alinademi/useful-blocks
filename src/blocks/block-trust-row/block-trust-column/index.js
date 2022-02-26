import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
  InnerBlocks,
  useBlockProps,
  InspectorControls,
  ColorPaletteControl,
  BlockControls,
  BlockVerticalAlignmentToolbar,
  BlockAlignmentToolbar,
} from '@wordpress/block-editor';

import {
  PanelBody,
  BaseControl,
  HorizontalRule,
  RangeControl,
  ToggleControl,
  TextControl,
  ButtonGroup,
  Button,
  ToolbarGroup,
} from '@wordpress/components';

// const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph'];

const higlightColorList = [
  { name: 'Success', color: '#f3faf7' },
  { name: 'Info', color: '#ebf5ff' },
  { name: 'Warning', color: '#fdfdea' },
  { name: 'Danger', color: '#fdf2f2' },
  { name: 'Purple', color: '#f5f4f9' },
];

const badgeColorList = [
  { name: 'Success', color: '#31c48d' },
  { name: 'Info', color: '#76a9fa' },
  { name: 'Warning', color: '#e3a008' },
  { name: 'Danger', color: '#f98080' },
  { name: 'Purple', color: '#9b51e0' },
];

registerBlockType('tblocks/trust-column', {
  title: __('Column block'),

  parent: ['tblocks/trust-row'],

  description: __('Provides column block inside trust-row block.'),

  supports: {
    anchor: true,
    html: true,
    className: false,
  },

  apiVersion: 2,

  category: 'tblocks',

  icon: 'plus',

  attributes: {
    content: {
      type: 'string',
    },
    border: {
      type: 'boolean',
    },
    paddingToggle: {
      type: 'boolean',
      default: false,
    },
    padding: {
      type: 'number',
      default: 0,
    },
    highlightColor: {
      type: 'string',
      default: '#ffffff',
    },
    badgeToggle: {
      type: 'boolean',
      default: false,
    },
    badgeText: {
      type: 'string',
    },
    badgeColor: {
      type: 'string',
    },
    badgeHAlign: {
      type: 'string',
    },
    colspan: {
      type: 'number',
      default: 1,
    },
    verticalAlign: {
      type: 'string',
    },
    horizontalAlign: {
      type: 'string',
    },
  },

  edit: (props) => {
    const {
      attributes: {
        border,
        highlightColor,
        badgeToggle,
        badgeText,
        badgeColor,
        badgeHAlign,
        paddingToggle,
        padding,
        colspan,
        verticalAlign,
        horizontalAlign,
      },
      setAttributes,
    } = props;

    const setBorder = (newBorder) => {
      setAttributes({ border: newBorder });
    };

    const setPadding = (newPadding) => {
      setAttributes({ padding: newPadding });
    };

    const setColspan = (newColspan) => {
      setAttributes({ colspan: newColspan });
    };

    const setHightlightColor = (newHightlightColor) => {
      setAttributes({ highlightColor: newHightlightColor });
    };

    const setBadgeText = (newBadgeText) => {
      setAttributes({ badgeText: newBadgeText });
    };

    const setBadgeColor = (newBadgeColor) => {
      setAttributes({ badgeColor: newBadgeColor });
    };

    const setVerticalAlign = (newVerticalAlign) => {
      setAttributes({ verticalAlign: newVerticalAlign });
    };

    const setHorizontalAlign = (newHorizontalAlign) => {
      setAttributes({ horizontalAlign: newHorizontalAlign });
    };

    const CLASSES = `trust-col ${border ? `with-border` : ''} ${
      highlightColor ? `with-highlight` : ''
    } ${badgeText ? `with-badge` : ''} ${
      badgeHAlign ? `badge-h-align-${badgeHAlign}` : ''
    } ${colspan ? `spans-${colspan}` : ''} ${
      padding ? `with-p-${padding}` : ''
    } ${verticalAlign ? `v-align-${verticalAlign}` : ''} ${
      horizontalAlign ? `h-align-${horizontalAlign}` : ''
    }`;

    const blockProps = useBlockProps({
      className: CLASSES,
    });

    return [
      <InspectorControls>
        <PanelBody
          title='Trust Column Settings'
          initialOpen={true}
          className='trust-block__side-panel-body'
        >
          <RangeControl
            label={__('Grow', 'tblocks')}
            value={colspan}
            onChange={setColspan}
            min={1}
            max={3}
            allowReset={true}
            resetFallbackValue={1}
            beforeIcon={'custom-icon__grow'}
          />

          <HorizontalRule />

          <ToggleControl
            label='Add Border'
            checked={border}
            onChange={setBorder}
          />

          <HorizontalRule />

          <ToggleControl
            label='Add Padding'
            checked={paddingToggle}
            onChange={(val) => setAttributes({ paddingToggle: val })}
          />
          {paddingToggle && (
            <RangeControl
              label={__('Padding', 'tblocks')}
              value={padding}
              onChange={setPadding}
              min={0}
              max={4}
              allowReset={true}
              resetFallbackValue={0}
              beforeIcon={'custom-icon__padding'}
            />
          )}

          <HorizontalRule />

          <ToggleControl
            label='Add Badge'
            checked={badgeToggle}
            onChange={(val) => setAttributes({ badgeToggle: val })}
          />
          {badgeToggle && [
            <TextControl
              label='Badge Text'
              value={badgeText}
              onChange={setBadgeText}
              type='text'
            />,

            <ColorPaletteControl
              label='Badge Color'
              value={badgeColor}
              onChange={setBadgeColor}
              colors={badgeColorList}
              disableCustomColors={true}
            />,
            <BaseControl
              label='Badge Alignment'
              className='button-group__base border p-1'
            >
              <ButtonGroup className='button-group--custom-spacing'>
                <Button
                  isSecondary
                  isSmall
                  icon={'custom-icon__btn-left-align'}
                  isTertiary={badgeHAlign == 'left'}
                  onClick={() => setAttributes({ badgeHAlign: 'left' })}
                >
                  Left
                </Button>
                <Button
                  isSecondary
                  isSmall
                  icon={'custom-icon__btn-center-align'}
                  isTertiary={badgeHAlign == 'center'}
                  onClick={() => setAttributes({ badgeHAlign: 'center' })}
                >
                  Center
                </Button>
                <Button
                  isSecondary
                  isSmall
                  icon={'custom-icon__btn-right-align'}
                  isTertiary={badgeHAlign == 'right'}
                  onClick={() => setAttributes({ badgeHAlign: 'right' })}
                >
                  Right
                </Button>
              </ButtonGroup>
            </BaseControl>,
          ]}

          <HorizontalRule />

          <ColorPaletteControl
            label='Background Color'
            value={highlightColor}
            onChange={setHightlightColor}
            colors={higlightColorList}
            disableCustomColors={true}
          />
        </PanelBody>
      </InspectorControls>,

      <BlockControls>
        <ToolbarGroup>
          <BlockVerticalAlignmentToolbar
            value={verticalAlign}
            onChange={setVerticalAlign}
          />
          <BlockAlignmentToolbar
            value={horizontalAlign}
            onChange={setHorizontalAlign}
            controls={['left', 'right', 'center']}
          />
        </ToolbarGroup>
      </BlockControls>,

      <div
        {...blockProps}
        data-highlight={highlightColor && highlightColor}
        data-badge-text={badgeText && badgeText}
        data-badge-color={badgeColor && badgeColor}
      >
        <InnerBlocks
        //   allowedBlocks={ALLOWED_BLOCKS}
        />
      </div>,
    ];
  },

  save: (props) => {
    const {
      attributes: {
        border,
        highlightColor,
        badgeText,
        badgeColor,
        badgeHAlign,
        colspan,
        padding,
        verticalAlign,
        horizontalAlign,
      },
    } = props;

    const CLASSES = `trust-col ${border ? `with-border` : ''} ${
      highlightColor ? `with-highlight` : ''
    } ${badgeText ? `with-badge` : ''} ${
      badgeHAlign ? `badge-h-align-${badgeHAlign}` : ''
    } ${colspan ? `spans-${colspan}` : ''} ${
      padding ? `with-p-${padding}` : ''
    } ${verticalAlign ? `v-align-${verticalAlign}` : ''} ${
      horizontalAlign ? `h-align-${horizontalAlign}` : ''
    }`;

    const blockProps = useBlockProps.save({
      className: CLASSES,
    });

    return (
      <div
        {...blockProps}
        data-highlight={highlightColor && highlightColor}
        data-badge-text={badgeText && badgeText}
        data-badge-color={badgeColor && badgeColor}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
});
