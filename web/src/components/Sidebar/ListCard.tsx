import classNames from "classnames";

interface ListCardProps {
  children: JSX.Element | JSX.Element[];

  sideBarStatus: boolean;
  cardTitle?: string;
  icon?: JSX.Element;
}

export function ListCard(props: ListCardProps) {
  const {
    children,
    sideBarStatus,
    cardTitle,
    icon
  } = props;

  return (
    <section className="px-4 py-6 bg-white rounded-xl overflow-hidden">
      {(cardTitle !== undefined || icon !== undefined) && (
        <div
          className="flex items-center gap-2 mt-1 mb-6"
        >
          <div className={classNames(!sideBarStatus && "m-auto")}>
            {icon}
          </div>

          <span className={classNames("text-sm text-gray-400 font-semibold uppercase tracking-wide whitespace-nowrap",
            sideBarStatus ? "" : "hidden"
          )}
          >
            {cardTitle}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  )
}