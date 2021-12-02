import clsx from "clsx";
import React from "react";
import NewsletterStacked, { NewsletterStackedProps } from "./NewsletterStacked";

type NewsletterStackedBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Newsletter form
   */
  formProps?: NewsletterStackedProps;

  /**
   * Gap class
   *
   * @default `gap-2`
   */
  gapClass?: string;

  /**
   * Padding
   * when the value is `true`, the tailwind class `p-4` will be applied
   *
   * @default true
   */
  padding?: boolean | string;

  /**
   * Rounded
   * when the value is `true`, the tailwind class `rounded-lg` will be applied
   *
   * @default false
   */
  rounded?: boolean | string;

  /**
   * Bordered
   * when the value is `true`, the tailwind class `border` will be applied
   *
   * @default false
   */
  bordered?: boolean | string;

  /**
   * Shadow
   * when the value is `true`, the tailwind class `shadow-md` will be applied
   *
   * @default false
   */
  shadow?: boolean | string;

  /**
   * Image
   *
   * @default undefined
   */
  backgroundImageUrl?: string;

  /**
   * Image overlay
   * @default false
   */
  overlay?: boolean;

  /**
   * Overlay component (`div`) class
   * @default undefined
   */
  overlayClass?: string;

  /**
   * Image overlay style
   * @default undefined
   */
  overlayStyle?: React.CSSProperties;
};

const NewsletterStackedBackground = React.forwardRef<
  HTMLDivElement,
  NewsletterStackedBackgroundProps
>((props, ref) => {
  // explode props
  const {
    formProps,
    gapClass,
    rounded,
    padding,
    bordered,
    shadow,
    backgroundImageUrl,
    overlay,
    overlayStyle,
    overlayClass,

    /**
     * Native props
     */
    className,
    style,
    ...restProps
  } = props;

  // explode style
  const { backgroundImage, backgroundSize, ...restStyle } = style ?? {};
  return (
    <div
      ref={ref}
      className={clsx([
        className,
        "flex flex-row overflow-hidden relative",
        gapClass,
        typeof bordered === "string" ? bordered : undefined,
        typeof shadow === "string" ? shadow : undefined,
        typeof padding === "string" ? padding : undefined,
        {
          border: bordered === true,
          "rounded-lg": rounded === true,
          "shadow-md": shadow === true,
          "p-4": padding === true,
        },
      ])}
      style={{
        backgroundSize: backgroundSize ?? "cover",
        backgroundImage: backgroundImage ?? `url(${backgroundImageUrl})`,
        ...restStyle,
      }}
      {...restProps}
    >
      {overlay === true &&
        (function () {
          // overlay style explode
          const { pointerEvents: pointerEventsOverlay, ...restOverlayStyle } =
            overlayStyle ?? {};
          return (
            <div
              className={clsx([
                overlayClass,
                "absolute inset-0 z-0",
                {
                  "bg-primary-500": overlayStyle === undefined,
                },
              ])}
              style={{
                pointerEvents: pointerEventsOverlay ?? "none",
                ...restOverlayStyle,
              }}
            ></div>
          );
        })()}
      {(() => {
        // form props
        const {
          padding: formPadding,
          className: formClassName,
          ...restFormProps
        } = formProps ?? {};
        return (
          <NewsletterStacked
            className={clsx([
              formClassName,
              "flex-auto",
              { "z-10": overlay === true },
            ])}
            padding={formPadding ?? true}
            {...restFormProps}
          />
        );
      })()}
    </div>
  );
});

NewsletterStackedBackground.defaultProps = {
  formProps: undefined,
  gapClass: undefined,
  padding: true,
  rounded: false,
  bordered: false,
  shadow: false,
  backgroundImageUrl: undefined,
  overlay: false,
  overlayClass: undefined,
  overlayStyle: undefined,
};

export default NewsletterStackedBackground;
