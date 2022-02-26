import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
  InnerBlocks,
  RichText,
  BlockControls,
  BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';

const ALLOWED_BLOCKS = [
  'core/heading',
  'core/paragraph',
  'core/image',
  'core/list',
  'core/group',
];

registerBlockType('tblocks/block-card', {
  title: __('Card block'),

  description: __('Provides custom card-block.'),

  keywords: [__('card'), __('box'), __('info')],

  supports: {
    anchor: true,
    html: true,
    className: false,
  },

  category: 'tblocks',

  icon: 'media-document',

  attributes: {
    cardTitle: {
      type: 'string',
      source: 'html',
      selector: '.trust-card__title',
    },
    cardActionBtn: {
      type: 'string',
      source: 'html',
      selector: '.trust-card__link',
    },
    horizontalAlign: {
      type: 'string',
      selector: 'trust-card__footer p',
    },
  },
  styles: [
    {
        name: 'default',
        label: __( 'Trust', 'tblocks' ),
        isDefault: true
    },
    {
        name: 'var-1',
        label: __( 'Style 1', 'tblocks' ),
        isDefault: false
    },
    {
        name: 'var-2',
        label: __( 'Style 2', 'tblocks' ),
        isDefault: false
    },
    {
        name: 'var-3',
        label: __( 'Style 3', 'tblocks' ),
        isDefault: false
    },
    {
        name: 'var-4',
        label: __( 'Style 4', 'tblocks' ),
        isDefault: false
    },
    {
        name: 'var-5',
        label: __( 'Style 5', 'tblocks' ),
        isDefault: false
    },
    {
        name: 'var-6',
        label: __( 'Style 6', 'tblocks' ),
        isDefault: false
    }
  ],

  edit: (props) => {
    const {
      attributes: { cardTitle, cardActionBtn, horizontalAlign, className },
      setAttributes,
    } = props;

    const onChangeCardTitle = (newCardTitle) => {
      setAttributes({ cardTitle: newCardTitle });
    };

    const onChangeCardActionBtn = (newCardActionBtn) => {
      setAttributes({ cardActionBtn: newCardActionBtn });
    };

    const setHorizontalAlign = (newHorizontalAlign) => {
      setAttributes({ horizontalAlign: newHorizontalAlign });
    };

    return [
      <BlockControls>
        <ToolbarGroup>
          <BlockAlignmentToolbar
            value={horizontalAlign}
            onChange={setHorizontalAlign}
            controls={['left', 'right', 'center']}
          />
        </ToolbarGroup>
      </BlockControls>,

      <div className={`${className} trust-card pop-the-box no-box-hover`} >
        <header className='trust-card__header'>
          <h3 className='trust-card__title'>
            <RichText
              placeholder={__('Card Title', 'tblocks')}
              value={cardTitle}
              onChange={onChangeCardTitle}
            />
          </h3>
        </header>

        <div className='trust-card__body'>
          <InnerBlocks
            allowedBlocks={ALLOWED_BLOCKS}
            placeholder={__('Card body text, Click to add text.', 'tblocks')}
          />
        </div>

        <footer calssName='trust-card__footer'>
          <p
            className={`trust-card__link ${
              horizontalAlign ? `btn-align-${horizontalAlign}` : ''
            }`}
          >
            <RichText
              placeholder={__('Card button text and link', 'tblocks')}
              value={cardActionBtn}
              onChange={onChangeCardActionBtn}
            />
          </p>
        </footer>
      </div>,
    ];
  },

  save: (props) => {
    const {
      attributes: { cardTitle, cardActionBtn, horizontalAlign, className },
    } = props;

    return (
      <div className='trust-card pop-the-box no-box-hover' id='trustCard'>
        {cardTitle && (
          <header className='trust-card__header'>
            <h3 className='trust-card__title bullet-icon fa-arrow-left'>
              <RichText.Content value={cardTitle} />
            </h3>
          </header>
        )}

        <div className='trust-card__body'>
          <InnerBlocks.Content />
        </div>

        {cardActionBtn && (
          <footer calssName='trust-card__footer'>
            <p
              className={`trust-card__link ${
                horizontalAlign ? `btn-align-${horizontalAlign}` : ''
              }`}
            >
              <RichText.Content value={cardActionBtn} />
            </p>
          </footer>
        )}
      </div>
    );
  },
});
