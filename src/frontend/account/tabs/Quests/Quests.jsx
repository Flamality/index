import React, { useContext } from "react";
import PageContent from "../../components/PageContent/PageContent";
import { Quests as QuestsContext } from "../../../../contexts/quests";
import styles from "./Quests.module.css";
import { FaCheck, FaCrown, FaLock, FaXmark } from "react-icons/fa6";
import Button from "../../../../components/core/elements/inputs/buttons/Button/Button";
import ButtonGroup from "../../../../components/core/elements/inputs/buttons/ButtonGroup/ButtonGroup";

export default function Quests() {
  const { quests } = useContext(QuestsContext);

  const questList = Object.entries(quests);
  const completed = questList.filter(([, quest]) => quest.rewarded).length;
  const total = questList.length;
  const progress = total ? (completed / total) * 100 : 0;

  return (
    <PageContent>
      <section className={styles.header}>
        <span className={styles.counter}>
          {completed} <span>/ {total}</span>
        </span>

        <div
          className={styles.bar}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Quest progression"
        >
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>

        <p className={styles.progressLabel}>
          {total > 0 && completed === total
            ? "All quests completed!"
            : `${Math.round(progress)}% completed`}
        </p>
      </section>

      <div className={styles.badgeClaim}>
        <p className={styles.badgeClaimText}>Claim your badge!</p>
        <ButtonGroup>
          <Button
            leading={<FaCrown />}
            tooltip="Must complete all quests first"
            disabled
          >
            Claim Badge
          </Button>
        </ButtonGroup>
      </div>

      <div className={styles.questList}>
        {questList.map(([id, quest]) => (
          <article
            key={id}
            className={`${styles.quest} ${
              quest.rewarded ? styles.rewarded : styles.notRewarded
            }`}
          >
            <div className={styles.status}>
              {quest.rewarded ? <FaCrown /> : <FaLock />}
            </div>

            <div className={styles.content}>
              <p className={styles.title}>{quest.title}</p>
              <p className={styles.description}>
                {quest.rewarded
                  ? quest.description
                  : "Complete this quest to reveal its details."}
              </p>
            </div>

            <span className={styles.questState}>
              {quest.rewarded ? "Completed" : "Locked"}
            </span>
          </article>
        ))}
      </div>
    </PageContent>
  );
}
